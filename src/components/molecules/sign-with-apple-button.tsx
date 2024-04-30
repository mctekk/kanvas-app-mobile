// Modules
import React from 'react';
import Foundation from 'react-native-vector-icons/Foundation';

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
  const {isSmall = false} = props;

  if (!isSmall) {
    return (
      <PillButton
        title={
          props?.isSignIn
            ? translate('signInApple', TextTransform.CAPITAL)
            : translate('signUpApple', TextTransform.CAPITAL)
        }
        icon={AppleIcon}
        {...props}
      />
    );
  }

  return <SmallButton icon={AppleIcon} {...props} />;
};

export default SignWithApple;
