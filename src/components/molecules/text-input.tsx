// Modules
import React from 'react';
import styled from 'styled-components/native';
import {View} from 'react-native';

// Styles
import {Typography, Colors} from 'styles';

// Atoms
import Text from 'atoms/text';
import LineTextInput from './line-text-input';

interface IProps {
  labelText: string;
  labelTextColor?: string;
  labelFontSize?: Number;
  textValue: string;
  textColor?: string;
  fontSize?: Number;
  placeholderText?: string;
  style?: Object;
  onChangeText: (text: string) => void;
  placeholderTextColor?: string;
  keyboardType?: string;
  onPressKeyboardSubmit?: () => void;
  returnKeyType?: string;
  autoCapitalize?: string;
  labelStyle?: Object;
  inputProps?: Object;
  textArea?: boolean;
  inputStyle?: Object;
  editable?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  secureTextEntry?: boolean;
  error?: boolean | string;
}

const Container = styled.View`
  margin-vertical: 3px;
`;

const Title = styled(Text)`
  color: ${(props: IProps) =>
    props.labelTextColor ? props.labelTextColor : Colors.SOFT_BLACK};
  font-size: ${(props: IProps) =>
    props.labelFontSize ? props.labelFontSize : Typography.FONT_SIZE_16}px;
  margin-bottom: 10px;
`;
const ErrorText = styled(Text)`
  color: ${Colors.ERROR_RED};
  font-size: ${Typography.FONT_SIZE_12}px;
  line-height: ${Typography.FONT_SIZE_16}px;
  padding-top: 5px;
  margin-left: 8px;
`;

const TextInput = (props: IProps) => {
  const {
    textValue,
    labelText,
    labelTextColor,
    labelFontSize,
    style,
    placeholderText,
    onChangeText,
    textColor,
    fontSize,
    placeholderTextColor = Colors.PLACEHOLDER_LIGHT,
    keyboardType,
    onPressKeyboardSubmit,
    returnKeyType,
    autoCapitalize = 'sentences',
    textArea,
    labelStyle,
    inputProps,
    inputStyle,
    onFocus,
    onBlur,
    editable = true,
    secureTextEntry = false,
    error = false | '',
  } = props;

  return (
    <Container style={style}>
      <Title
        style={labelStyle}
        size={labelFontSize || Typography.FONT_SIZE_16}
        labelTextColor={labelTextColor}>
        {labelText}
      </Title>

      <LineTextInput
        textColor={textColor}
        fontSize={fontSize}
        onChangeText={onChangeText}
        inputValue={textValue}
        placeholder={placeholderText}
        placeholderTextColor={placeholderTextColor}
        keyboardType={keyboardType ? keyboardType : 'default'}
        onSubmitEditing={onPressKeyboardSubmit}
        returnKeyType={returnKeyType}
        autoCapitalize={autoCapitalize}
        textArea={textArea}
        style={inputStyle}
        onFocus={onFocus}
        onBlur={onBlur}
        editable={editable}
        secureTextEntry={secureTextEntry}
        {...inputProps}
      />

      {error ? <ErrorText>{error}</ErrorText> : <></>}
    </Container>
  );
};

export default TextInput;
