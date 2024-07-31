// Modules
import React from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

// Molecules
import PillButton, { PillButtonProps } from 'molecules/pill-button';

// Atoms
import SmallButton from 'atoms/small-button';
import { translate, TextTransform } from 'atoms/localized-label';

// Assets
import GoogleIcon from 'assets/icons/google-icon';

const GIcon = () => <GoogleIcon width={21} height={20} />;

const SignWithGoogle = (props: Partial<PillButtonProps>) => {

  const { isSmall = false, onLogin } = props;

  const handleLogin = async () => {
    try {

      GoogleSignin.configure({
        webClientId: Config.GOOGLE_WEB_CLIENT_ID,
        iosClientId: Config.GOOGLE_IOS_CLIENT_ID,
      });

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (Object.keys(userInfo).length === 0) {
        console.log('Google Auth Error: Empty userInfo');
        return;
      }

      if (Object.keys(userInfo?.user).length !== 0) {
        // HERE: Implement the logic to handle the user data
        console.log('Google User Info:', userInfo);
        onLogin?.('google', userInfo?.idToken);
      }

    } catch (error) {
      if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('SIGN_IN_CANCELLED');
      } else if (error?.code === statusCodes.IN_PROGRESS) {
        console.log('IN_PROGRESS');
      } else if (error?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        console.log('Google Auth Error', error);
        throw new Error(`Google Auth Error: ${error}`);
      }
    }
  };

  if (!isSmall) {
    return (
      <PillButton
        title={
          props?.isSignIn
            ? translate('signInGoogle', TextTransform.CAPITAL)
            : translate('signUpGoogle', TextTransform.CAPITAL)
        }
        icon={GIcon}
        onPress={handleLogin}
        {...props}
      />
    );
  }

  return <SmallButton icon={GIcon} onPress={handleLogin} {...props} />;
};

export default SignWithGoogle;
