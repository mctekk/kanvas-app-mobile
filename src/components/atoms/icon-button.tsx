// Modules
import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';

// Atoms
import { VectorIconProps, VectorIconsTypes } from './icon';

const Button = styled.TouchableOpacity`
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : 'transparent'};
`;

const IconContainer = styled.View`
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;

interface IconButtonProps extends VectorIconProps, TouchableOpacityProps {
  backgroundColor?: string;
  disabled?: boolean;
  iconType: string;
  name: string;
  color: string;
  size: number;
  onPress: () => void;
}

const IconButton = ({
  iconType,
  name,
  color,
  size,
  disabled,
  ...props
}: IconButtonProps) => {
  const Icon = VectorIconsTypes[iconType];

  return (
    <Button disabled={disabled} {...props}>
      <IconContainer disabled={disabled}>
        <Icon name={name} color={color} size={size} />
      </IconContainer>
    </Button>
  );
};

export { IconButtonProps };

export default IconButton;
