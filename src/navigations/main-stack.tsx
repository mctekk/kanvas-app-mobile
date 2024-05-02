// Modules
import React, { useEffect, useReducer } from 'react';
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

// Services
import { client } from 'services/api';

// Constants
const Stack = createStackNavigator();

const MainStack = ({ navigation }) => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case SIGN_IN:
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            refresh_token: action.refresh_token,
            userData: action.user,
            isLoading: false,
          };
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
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      refresh_token: null,
      userData: null,
    },
  );

  const onRefreshToken = async () => {
    try {
      const refresh_token = await AsyncStorage.getItem(REFRESH_TOKEN);

      if (refresh_token == null) {
        dispatch({ type: SIGN_OUT });
        return;
      }

      const response = await client.auth.refreshToken(refresh_token);
      const { refreshToken } = response;
      console.log('Refresh Token Response:', response);
      await AsyncStorage.setItem(AUTH_TOKEN, refreshToken.token);
      dispatch({
        type: UPDATE_TOKEN,
        token: refreshToken.token,
      });
    } catch (error) {
      console.log('Refresh Token Error:', error);
      dispatch({ type: SIGN_OUT });
    }
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      let userData;
      let rooftopSelected;
      try {
        onRefreshToken();
        const token = await AsyncStorage.getItem(AUTH_TOKEN);
        userToken = token;

        const user = await AsyncStorage.getItem(USER_DATA);
        const userInfo = JSON.parse(user || ''); // Provide a default value of an empty string
        userData = userInfo;
      } catch (e) {
        // Restoring token failed
        dispatch({ type: SIGN_OUT });
      }
      dispatch({
        type: REFRESH_TOKEN,
        token: userToken,
        user: userData,
        rooftopSelected: rooftopSelected,
      });
    };
    bootstrapAsync();
  }, []);

  const onUserLogout = async () => {
    try {
      const response = await client.auth.logout();
      await AsyncStorage.multiRemove([AUTH_TOKEN, USER_DATA, REFRESH_TOKEN]);
    } catch (error) {
      console.log('Logout Error:', error);
      throw new Error(`An error occurred while logging out, ${error}`);
    }
  };

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        AsyncStorage.setItem(AUTH_TOKEN, data.token);
        AsyncStorage.setItem(USER_DATA, JSON.stringify(data.user));
        AsyncStorage.setItem(REFRESH_TOKEN, data.refresh_token);
        dispatch({
          type: SIGN_IN,
          token: data.token,
          user: data.user,
          refresh_token: data.refresh_token,
        });
      },
      signUp: async data => {
        AsyncStorage.setItem(AUTH_TOKEN, data.token);
        AsyncStorage.setItem(USER_DATA, JSON.stringify(data.user));
        AsyncStorage.setItem(REFRESH_TOKEN, data.refresh_token);
        dispatch({
          type: SIGN_UP,
          token: data.token,
          user: data.user,
          refresh_token: data.refresh_token,
        });
      },
      signOut: async () => {
        onUserLogout();
        dispatch({ type: SIGN_OUT });
      },
      updateUserData: async data => {
        AsyncStorage.setItem(USER_DATA, JSON.stringify(data.user || data));
        dispatch({ type: USER_DATA_UPDATE, user: data.user || data });
      },
    }),
    [],
  );

  return (
    <AuthContextProvider value={authContext}>
      <UserContextProvider
        value={{
          userData: state.userData,
          userToken: state.userToken,
          isLoading: state.isLoading,
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
