/* eslint-disable prettier/prettier */
// Modules
import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';

// Styles
import { Colors } from 'styles';
import { DEFAULT_THEME } from 'styles/theme';

export interface PillButtonProps extends TouchableOpacityProps {
  title: string;
  icon?: React.ElementType;
  backgroundColor?: string;
  textColor?: string;
  iconDivider?: boolean;
  customIcon?: React.ElementType;
  textProps?: any;
  isSignIn?: boolean;
  isLoading?: boolean;
}

const Container = styled.TouchableOpacity`
  width: 50px;
  height:  50px;
  border-radius: 8px;
  background-color: ${Colors.PRIMARY};
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  border-color: ${Colors.PRIMARY};
  margin-horizontal: 10px;
`;

const IconContainer = styled.View`
  border-right-width: ${(props: PillButtonProps) => props.iconDivider ? '1px' : '0px'};
  border-right-color: ${Colors.BUTTON_GAP_COLOR};
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

const SmallButton = (props: PillButtonProps) => {
  const {
    title,
    icon,
    backgroundColor = Colors.BLACK,
    iconDivider = false,
    textProps,
    isLoading = false,
  } = props;

  const Icon = icon;

  return (
    <Container backgroundColor={backgroundColor} {...props}>
      {Icon && (
        <IconContainer iconDivider={iconDivider}>
          <Icon />
        </IconContainer>
      )}

      {isLoading && <ActivityIndicator size="small" color={DEFAULT_THEME.white} />}
    </Container>
  );
};

export default SmallButton;
