// Modules
import React from 'react';
import styled from 'styled-components/native';

// Atoms
import CustomButton from 'components/atoms/button';
import Text from 'components/atoms/text';

// Styles
import { DEFAULT_THEME } from 'styles/theme';
import { Colors, Typography } from 'styles';

export const Title = styled(Text)`
  font-size: ${Typography.FONT_SIZE_24}px;
  line-height: ${Typography.FONT_SIZE_32}px;
  font-weight: bold;
  color: ${DEFAULT_THEME.text};
`;

export const Content = styled.View`
  margin-top: 40px;
`;

export const Button = styled(CustomButton)`
  width: 100%;
  height: 40px;
`;

export const ForgotPasswordButton = styled(CustomButton)`
  top: 20px;
  background-color: 'rgba(52, 52, 52, 0)';
`;

export const SignUpButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 40px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export const SignUpText = styled(Text)`
  font-size: ${Typography.FONT_SIZE_16}px;
  line-height: ${Typography.FONT_SIZE_22}px;
  color: ${DEFAULT_THEME.text};
`;

export const SocialContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
