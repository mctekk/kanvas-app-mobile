// Modules
import React, { useEffect, useReducer } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

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
} from 'utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      let userData;
      let rooftopSelected;
      try {
        const token = await AsyncStorage.getItem(AUTH_TOKEN);
        const tokenInfo = JSON.parse(token || ''); // Provide a default value of an empty string
        userToken = tokenInfo;

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

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        AsyncStorage.setItem(AUTH_TOKEN, JSON.stringify(data.token));
        AsyncStorage.setItem(USER_DATA, JSON.stringify(data.user));
        AsyncStorage.setItem(REFRESH_TOKEN, JSON.stringify(data.refresh_token));
        dispatch({
          type: SIGN_IN,
          token: data.token,
          user: data.user,
          refresh_token: data.refresh_token,
        });
      },
      signUp: async data => {
        AsyncStorage.setItem(AUTH_TOKEN, JSON.stringify(data.token));
        AsyncStorage.setItem(USER_DATA, JSON.stringify(data.user));
        AsyncStorage.setItem(REFRESH_TOKEN, JSON.stringify(data.refresh_token));
        dispatch({
          type: SIGN_UP,
          token: data.token,
          user: data.user,
          refresh_token: data.refresh_token,
        });
      },
      signOut: async () => {
        AsyncStorage.removeItem(AUTH_TOKEN);
        AsyncStorage.removeItem(USER_DATA);
        AsyncStorage.removeItem(REFRESH_TOKEN);
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
