// Modules
import React from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';

// Atoms
import { translate, TextTransform } from 'atoms/localized-label';
import SmallButton from 'atoms/small-button';

// Styles
import { Colors } from 'styles';

// Molecules
import PillButton, { PillButtonProps } from './pill-button';

// Utils
import { isIphoneX } from 'utils/iphone-helpers';

interface SocialButtonIconsProps {
  isSmall?: boolean;
  onLogin?: () => void;
}

const FacebookIcon = () => (
  <Fontisto name="facebook" size={20} color={Colors.FACEBOOK} />
);

const SignWithFacebook = (
  props: Partial<PillButtonProps, SocialButtonIconsProps>,
) => {
  const { isSmall = false, onLogin } = props;

  const handleLogin = async () => {
    console.log('Facebook Login');
    try {
      const loginState = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      console.log('Login State: ', loginState);
      if (!loginState.isCancelled) {
        const infoRequest = new GraphRequest(
          '/me?fields=name,picture,email',
          null,
          (error: any, user: ISocialLoginUser) => {
            if (!error) {
              console.log('Facebok User Info: ', user);
              // HERE: Implement the logic to handle the user data
              onLogin?.('facebook', user);
            } else {
              console.log('Error fetching data: ');
            }
          },
        );
        new GraphRequestManager().addRequest(infoRequest).start();
      }
    } catch (error) {
      console.log('Facebook Login Error:', error);
    }
  };

  if (!isSmall) {
    return (
      <PillButton
        title={
          props?.isSignIn
            ? translate('signInFacebook', TextTransform.CAPITAL)
            : translate('signUpFacebook', TextTransform.CAPITAL)
        }
        icon={FacebookIcon}
        onPress={handleLogin}
        {...props}
      />
    );
  }

  return <SmallButton icon={FacebookIcon} onPress={handleLogin} {...props} />;
};

export default SignWithFacebook;
