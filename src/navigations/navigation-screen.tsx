// Screen
import { ChangePassword } from "screens/change-password";
import { EditProfile } from "screens/edit-profile";
import { Home } from "screens/home";
import { Inventory } from "screens/invetory";
import { Notifications } from "screens/notifications";
import { SignIn } from "screens/sign-in";
import { SignUp } from "screens/sign-up";


const navigationDefaultOptions = {
  headerShown: false,
};

export const navigationScreen = [
  {
    name: 'SignIn',
    screen: SignIn,
    options: {
      navigationDefaultOptions,
    },
  },
  {
    name: 'SignUp',
    screen: SignUp,
    options: {
      navigationDefaultOptions,
    },
  },
  {
    name: 'EditProfile',
    screen: EditProfile,
    options: {
      navigationDefaultOptions,
    },
  },
  {
    name: 'ChangePassword',
    screen: ChangePassword,
    options: {
      navigationDefaultOptions,
    },
  },
  {
    name: 'Inventory',
    screen: Inventory,
    options: {
      navigationDefaultOptions,
    },
  },
  {
    name: 'Notifications',
    screen: Notifications,
    options: {
      navigationDefaultOptions,
      presentation: 'modal',
    },
  },
];
