// Modules
import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Scenes
import HomeStack from './stacks/home-stack';
import LoginStack from './stacks/login-stack';

// Constants

const Stack = createStackNavigator();

const MainStack = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginStack" component={LoginStack} />

      <Stack.Screen name="HomeStack" component={HomeStack} />
    </Stack.Navigator>
  );
};

export default MainStack;
