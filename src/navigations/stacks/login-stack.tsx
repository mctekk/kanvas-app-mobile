// Modules
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import { SignIn } from 'screens/sign-in';
import { SignUp } from 'screens/sign-up';
import { ForgotPassword } from 'screens/forgot-password/forgot-password';

const Stack = createStackNavigator();

const LoginStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default LoginStack;
