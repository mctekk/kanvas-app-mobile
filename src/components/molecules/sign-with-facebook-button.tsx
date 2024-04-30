// Modules
import React from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';

// Atoms
import {translate, TextTransform} from 'atoms/localized-label';
import SmallButton from 'atoms/small-button';

// Styles
import {Colors} from 'styles';

// Molecules
import PillButton, {PillButtonProps} from './pill-button';

// Utils
import {isIphoneX} from 'utils/iphone-helpers';

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
  const {isSmall = false} = props;

  const handleLogin = async () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      result => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
        }
      },
      error => {
        console.log('Login fail with error: ' + error);
      },
    );
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
