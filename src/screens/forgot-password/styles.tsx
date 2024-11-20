// Modules
import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Styles
import { Colors, Typography } from 'styles';

// Molecules
import Header from 'components/molecules/header';
import TextInput from 'components/molecules/text-input';

// Atoms
import Text from 'components/atoms/text';
import Button from 'components/atoms/button';

// Styles
import { DEFAULT_THEME } from 'styles/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${DEFAULT_THEME.background};
`;

export const ScreenHeader = styled(Header)`
  justify-content: space-between;
  align-items: center;
  background-color: ${DEFAULT_THEME.primary};
`;

export const Content = styled(KeyboardAwareScrollView)`
  margin-top: -30px;
`;

export const Title = styled(Text)`
  font-size: ${Typography.FONT_SIZE_22}px;
  line-height: ${Typography.FONT_SIZE_24}px;
  font-weight: bold;
  color: ${DEFAULT_THEME.text};
  text-align: center;
  margin-bottom: 5px;
`;

export const Subtitle = styled(Text)`
  font-size: ${Typography.FONT_SIZE_14}px;
  line-height: ${Typography.FONT_SIZE_24}px;
  color: ${DEFAULT_THEME.text};
  text-align: center;
  margin-bottom: 15px;
`;

export const Input = styled(TextInput)`
  width: 75%;
`;

export const SendButton = styled(Button)`
  width: 50%;
  height: 40px;
  border-radius: 5px;
`;
