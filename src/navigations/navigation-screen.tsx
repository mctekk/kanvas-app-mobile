// Screen
import { Home } from "screens/home";
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
];
