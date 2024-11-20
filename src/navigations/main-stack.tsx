// Modules
import React, { useEffect, useReducer, useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Scenes
import HomeStack from './stacks/home-stack';
import LoginStack from './stacks/login-stack';

// Context
import { AuthContextProvider } from 'components/context/auth-context';
import { UserContextProvider } from 'components/context/user-context';

// Utils
import {
  AUTH_TOKEN,
  REFRESH_TOKEN,
  USER_DATA,
  SIGN_IN,
  SIGN_OUT,
  USER_DATA_UPDATE,
  SIGN_UP,
  UPDATE_TOKEN,
} from 'utils/constants';

// core
import { client } from 'core/kanvas_client';
import kanvasService from 'core/services/kanvas-service';
import authService from 'core/services/auth-service';

// Constants
const Stack = createStackNavigator();

const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  refresh_token: null,
  userData: null,
};

const reducer = (prevState, action) => {
  switch (action.type) {
    case SIGN_IN:
    case SIGN_UP:
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
        refresh_token: action.refresh_token,
        userData: action.user,
        isLoading: false,
      };
    case REFRESH_TOKEN:
      return {
        ...prevState,
        userToken: action.token,
        refresh_token: action.refresh_token,
        userData: action.user,
        isLoading: false,
      };
    case USER_DATA_UPDATE:
      return {
        ...prevState,
        userData: action.user,
        isLoading: false,
      };
    case SIGN_OUT:
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
        refresh_token: null,
        userData: null,
      };
    case UPDATE_TOKEN:
      return {
        ...prevState,
        userToken: action.token,
        refresh_token: action.refresh_token,
      };
    default:
      return prevState;
  }
};

const MainStack = ({ navigation }) => {
  const AsyncKeys = [AUTH_TOKEN, USER_DATA, REFRESH_TOKEN];
  const [state, dispatch] = useReducer(reducer, initialState);

  const onRefreshToken = async () => {
    try {
      const refresh_token = await AsyncStorage.getItem(REFRESH_TOKEN);
      if (!refresh_token) {
        dispatch({ type: SIGN_OUT });
        return;
      }

      const response = await client.auth.refreshToken(refresh_token);
      const { refreshToken } = response;
      await AsyncStorage.setItem(AUTH_TOKEN, refreshToken.token);
      dispatch({ type: UPDATE_TOKEN, token: refreshToken.token });
    } catch (error) {
      console.error('Refresh Token Error:', error);
      onUserLogout();
      dispatch({ type: SIGN_OUT });
    }
  };

  const onUserUpdate = async () => {
    try {
      const response = await kanvasService.getUserData();
      dispatch({ type: USER_DATA_UPDATE, user: response });
    } catch (error) {
      console.error('User Update Error:', error);
      onUserLogout();
      dispatch({ type: SIGN_OUT });
      throw new Error(`An error occurred while updating user data, ${error}`);
    }
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem(AUTH_TOKEN);
        if (token) {
          onRefreshToken();
          onUserUpdate();
        }

        const user = await AsyncStorage.getItem(USER_DATA);
        const userInfo = JSON.parse(user || '{}');
        dispatch({ type: REFRESH_TOKEN, token, user: userInfo });
      } catch (e) {
        await AsyncStorage.multiRemove(AsyncKeys);
        dispatch({ type: SIGN_OUT });
      }
    };
    bootstrapAsync();
  }, []);

  const onUserLogout = async () => {
    try {
      await authService.onSignOut();
      await AsyncStorage.multiRemove(AsyncKeys);
      dispatch({ type: SIGN_OUT });
    } catch (error) {
      console.error('Logout Error:', error);
      throw new Error(`An error occurred while logging out, ${error}`);
    }
  };

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        console.log('data', data);
        await AsyncStorage.multiSet([
          [AUTH_TOKEN, data.token],
          [USER_DATA, JSON.stringify(data.user)],
          [REFRESH_TOKEN, data.refresh_token],
        ]);
        dispatch({ type: SIGN_IN, token: data.token, user: data.user, refresh_token: data.refresh_token });
      },
      signUp: async data => {
        await AsyncStorage.multiSet([
          [AUTH_TOKEN, data.token],
          [USER_DATA, JSON.stringify(data.user)],
          [REFRESH_TOKEN, data.refresh_token],
        ]);
        dispatch({ type: SIGN_UP, token: data.token, user: data.user, refresh_token: data.refresh_token });
      },
      signOut: async () => {
        onUserLogout();
        dispatch({ type: SIGN_OUT });
      },
      updateUserData: async data => {
        await AsyncStorage.setItem(USER_DATA, JSON.stringify(data.user || data));
        dispatch({ type: USER_DATA_UPDATE, user: data.user || data });
      },
    }),
    []
  );

  return (
    <AuthContextProvider value={authContext}>
      <UserContextProvider
        value={{
          userData: state.userData,
          userToken: state.userToken,
          isLoading: state.isLoading,
          isUserLogged: !!state.userData?.id,
        }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {state.userToken == null ? (
            <Stack.Screen name="LoginStack" component={LoginStack} />
          ) : (
            <Stack.Screen name="HomeStack" component={HomeStack} />
          )}
        </Stack.Navigator>
      </UserContextProvider>
    </AuthContextProvider>
  );
};

export default MainStack;
