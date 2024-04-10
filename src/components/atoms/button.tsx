// Modules
import React from 'react';
import styled from 'styled-components';

// Atoms
import Text from './text';

// Styles
import { Colors, Typography } from 'styles';
import { ActivityIndicator, StyleProp } from 'react-native';

interface IButtonProps {
  style?: Object;
  title?: string;
  textStyle?: StyleProp<Text>;
  loading?: boolean;
}

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${Colors.PRIMARY};
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
  const { style, title = '', loading = false, textStyle } = props;

  return (
    <ButtonContainer style={style} {...props}>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.WHITE} />
      ) : (
        <ButtonText style={textStyle}>{title}</ButtonText>
      )}
    </ButtonContainer>
  );
};

export default Button;
