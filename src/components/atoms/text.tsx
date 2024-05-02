// Modules
import { TextProps } from 'react-native';
import styled from 'styled-components/native';

// Styles
import { Colors, Typography } from 'styles';
import { DEFAULT_THEME } from 'styles/theme';

// Utils
import { capitalize } from 'utils';


export interface ITextProps extends TextProps {
  size?: number,
  color?: string,
  weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900',
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify',
  fontStyle?: 'regular' | 'italic' | 'bold' | 'semi-bold' | 'light' | 'bold-italic' | 'medium'
  lineHeight?: number,
}

const CustomText = styled.Text`
  font-size: ${(props: ITextProps) => props.size || '14'}px;
  line-height: ${(props: ITextProps) => (props.lineHeight || props.size + 2.5 || 15)}px;
  color: ${(props: ITextProps) => props.color || DEFAULT_THEME.text};
  text-align: ${(props: ITextProps) => props.align || 'auto'};
  font-weight: ${(props: ITextProps) => props.weight || 'normal'};
`;

const Text = (props: ITextProps) => {
  const { children } = props;
  return (
    <CustomText
      allowFontScaling={false}
      {...props}
    >
      {children}
    </CustomText>
  );
};

export default Text;
