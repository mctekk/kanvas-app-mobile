/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
// Modules
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import { navigationScreen } from 'navigations/navigation-screen';
import { Home } from 'screens/home';
import { Settings } from 'screens/settings';
import { DrawerContent } from 'components/molecules/drawer-content';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ navigation }) => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};

const HomeStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />

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
