// Modules
import React from 'react';
import Foundation from 'react-native-vector-icons/Foundation';
import {appleAuth} from '@invertase/react-native-apple-authentication';

// Atoms
import {translate, TextTransform} from 'atoms/localized-label';
import SmallButton from 'atoms/small-button';

// Styles
import {Colors} from 'styles';

// Molecules
import PillButton, {PillButtonProps} from 'molecules/pill-button';

// Utils
import {isIphoneX} from 'utils/iphone-helpers';

interface SocialButtonIconsProps {
  isSmall?: boolean;
  onLogin?: () => void;
}

const AppleIcon = () => (
  <Foundation
    name="social-apple"
    size={24}
    color={isIphoneX() ? Colors.WHITE : Colors.BLACK}
  />
);

const SignWithApple = (
  props: Partial<PillButtonProps, SocialButtonIconsProps>,
) => {
  const {isSmall = false, onLogin, } = props;

  const handleLogin = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      if (credentialState === appleAuth.State.AUTHORIZED) {
        const {fullName} = appleAuthRequestResponse;
        const user = {
          email: appleAuthRequestResponse.email,
          id: appleAuthRequestResponse.identityToken,
          name: '',
        };
        if (fullName && fullName.givenName) {
          user.name = `${fullName.givenName} ${fullName.familyName}`;
        }
        // HERE: Implement the logic to handle the user data
        onLogin?.('apple', user);
      } else {
        console.log('Apple Login Failed', credentialState);
        throw new Error('Apple Login Failed');
      }
    } catch (error) {
      console.log('Apple Login Error:', error);
    }
  };

  if (!isSmall) {
    return (
      <PillButton
        title={
          props?.isSignIn
            ? translate('signInApple', TextTransform.CAPITAL)
            : translate('signUpApple', TextTransform.CAPITAL)
        }
        icon={AppleIcon}
        onPress={handleLogin}
        {...props}
      />
    );
  }

  return <SmallButton icon={AppleIcon} onPress={handleLogin} {...props} />;
};

export default SignWithApple;
