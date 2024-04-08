// Modules
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import { Home } from 'screens/home';
import { navigationScreen } from 'navigations/navigation-screen';

const Stack = createStackNavigator();

const HomeStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />

      {navigationScreen.map((navScreen, index) => {
        return (
          <Stack.Screen
            key={index}
            name={navScreen.name}
            component={navScreen.screen}
            initialParams={navScreen.initialParams}
            options={({ route, navigation }) => ({
              ...navScreen.options,
            })}
          />
        );
      })}
    </Stack.Navigator>
  );
};

export default HomeStack;
