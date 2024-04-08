// Modules
import React from 'react';
import styled from 'styled-components';

// Atoms
import Text from './text';

// Styles
import { Colors, Typography } from 'styles';

interface IButtonProps {
  style?: Object;
  title?: string;
}

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${Colors.SOFT_BLUE};
  justify-content: center;
  align-items: center;
  margin-top: 32px;
  border-radius: 2px;
`;

const ButtonText = styled(Text)`
  color: ${Colors.WHITE};
  font-size: ${Typography.FONT_SIZE_16}px;
  line-height: ${Typography.FONT_SIZE_20}px;
  text-align: center;
`;

const Button = (props: IButtonProps) => {
  // Props
  const { style, title = '' } = props;

  return (
    <ButtonContainer style={style} {...props}>
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  );
};

export default Button;
