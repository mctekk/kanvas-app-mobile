// Modules
import React from 'react';
import styled from 'styled-components/native';

// Styles
import { Typography, Colors } from 'styles';

// Atoms
import Text, { getFontFamily } from 'atoms/text';

const TextInput = styled.TextInput`
  border-width: 1px;
  height: 36px;
  border-width: 1px;
  border-color: ${Colors.BORDER_COLOR};
  border-radius: 10px;
  padding-horizontal: 10px;
  font-size: ${(props) => (props.fontSize ? props.fontSize : Typography.FONT_SIZE_14)}px;
  color: ${(props) => (props.textColor ? props.textColor : Colors.SOFT_BLACK)};
`;

const TextArea = styled.TextInput`
  border-radius: 10px;
  padding-left: 16px;
  flex: 1px;
  min-height: 120px;
  font-size: ${(props) => (props.fontSize ? props.fontSize : Typography.FONT_SIZE_14)}px;
  color: ${(props) => (props.textColor ? props.textColor : Colors.SOFT_BLACK)};
`;

const StyledText = styled(Text)`
  flex: 1;
  right: 0;
  bottom: 0;
  position: absolute;
  margin-bottom: 16px;
  margin-right: 16px;
`;

const TextAreaContainer = styled.View`
  flex: 1;
`;

interface IProps {
  onChangeText: Function;
  inputValue: string;
  placeholder?: string;
  placeholderTextColor?: string;
  style?: Object;
  fontSize?: Number;
  textColor?: string;
  textArea?: boolean;
  maxLength?: number;
}

const LineTextInput = ({
  onChangeText,
  inputValue,
  placeholder,
  placeholderTextColor,
  fontSize,
  textColor,
  style,
  textArea,
  ...props
}: IProps) => {
  if (textArea) {
    return (
      <TextAreaContainer>
        <TextArea
          {...props}
          fontSize={fontSize}
          textColor={textColor}
          style={style}
          multiline
          onChangeText={(text: any) => onChangeText(text)}
          value={inputValue}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor || Colors.PLACEHOLDER_TEXT}
        />
        {props?.maxLength && (
          <StyledText color={Colors.PLACEHOLDER_TEXT} size={13}>
            {`${inputValue.length}/${props.maxLength}`}
          </StyledText>
        )}
      </TextAreaContainer>
    );
  }
  return (
    <TextInput
      {...props}
      fontSize={fontSize}
      textColor={textColor}
      style={style}
      onChangeText={(text: any) => onChangeText(text)}
      value={inputValue}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor || Colors.PLACEHOLDER_TEXT}
    />
  );
};

export default LineTextInput;
