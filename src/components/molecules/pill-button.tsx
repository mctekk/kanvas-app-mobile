// Modules
import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';

// Styles
import { Colors, Typography } from 'styles';

// Atoms
import Text from 'atoms/text';
import { isIphoneX } from 'utils/iphone-helpers';
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

const Pill = styled.TouchableOpacity`
  width: ${isIphoneX() ? 350 : 320}px;
  height: ${isIphoneX() ? 50 : 45}px;
  border-radius: 30px;
  flex-direction: row;
  background-color: ${(props: PillButtonProps) => props.backgroundColor ?? DEFAULT_THEME.black};
  margin-bottom: 10px;
  paddingHorizontal: 20px;
  border-width: 1.5px;
  justify-content: center;
  align-items: center;
  border-color: ${Colors.WHITE};
`;

const IconContainer = styled.View`
  border-right-width: ${(props: PillButtonProps) =>
    props.iconDivider ? '1px' : '0px'};
  border-right-color: ${Colors.BUTTON_GAP_COLOR};
  width: 30px;
  height: 30px;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
`;

const PillText = styled(Text)`
  color: ${(props: PillButtonProps) => props.color ?? DEFAULT_THEME.white};
  font-size: ${Typography.FONT_SIZE_16}px;
  line-height: ${Typography.FONT_SIZE_17}px;
  font-weight: ${Typography.FONT_WEIGHT_MEDIUM};
`;

const PillButton = (props: PillButtonProps) => {
  const {
    title,
    icon,
    textColor = DEFAULT_THEME.white,
    backgroundColor = Colors.BLACK,
    iconDivider = false,
    textProps,
    isLoading = false,
  } = props;

  const Icon = icon;

  return (
    <Pill backgroundColor={backgroundColor} {...props}>
      {Icon && (
        <IconContainer iconDivider={iconDivider}>
          <Icon />
        </IconContainer>
      )}

      {!isLoading && (
        <PillText color={textColor} {...textProps}>
          {title}
        </PillText>
      )}

      {isLoading && <ActivityIndicator size="small" color={DEFAULT_THEME.white} />}
    </Pill>
  );
};

export default PillButton;
