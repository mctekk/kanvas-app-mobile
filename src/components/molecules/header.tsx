// Modules
import React from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

// Atoms
import Text from 'atoms/text';
import BackButton from 'components/atoms/back-button';
import CloseButton from 'components/atoms/close-button';

// Styles
import { Colors, Typography } from 'styles';
import { DEFAULT_THEME } from 'styles/theme';

export interface IProps {
  title?: string;
  customHeader?: any;
  titleProps?: any;
  rightButtonComponent?: any;
  leftButtonComponent?: any;
  rightButtonProps?: any;
  buttonTitleProps?: any;
  style?: object;
  closeButtonType?: 'CLOSE' | 'BACK';
  onLeftButtonPress?: () => void;
  onBackDetail?: () => void;
  diableBackButton?: boolean;
  backIconColor?: string;
  hasBackButton?: boolean;
}

const SCREEN_MARGIN = 15;
const HEADER_HEIGHT = Platform.OS === 'ios' ? 130 : 90;
const HEADER_PADDING_TOP = Platform.OS === 'ios' ? 30 : 1;

const Container = styled.View`
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  padding-top: ${HEADER_PADDING_TOP}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${SCREEN_MARGIN}px;
  padding-bottom: ${SCREEN_MARGIN}px;
  background-color: ${DEFAULT_THEME.primary};
`;

// @ts-ignore
const Title = styled(Text)`
  color: ${Colors.WHITE};
  font-size: ${Typography.FONT_SIZE_20}px;
  line-height: ${Typography.FONT_SIZE_24}px;
  width: 200px;
  text-align: center;
  padding-top: 10px;
`;

const CustomHeader = styled.View`
  position: absolute;
  align-items: center;
  align-self: center;
  justify-content: center;
  width: 100%;
  margin-horizontal: ${SCREEN_MARGIN}px;
  padding-bottom: ${SCREEN_MARGIN}px;
  z-index: -1;
`;

const IconContainer = styled.TouchableOpacity`
  height: 50px;
  width: 40px;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  margin-right: 0px;
`;

const Header = (props: IProps) => {
  const navigation = useNavigation();

  const {
    title,
    titleProps,
    customHeader,
    rightButtonComponent,
    leftButtonComponent,
    onLeftButtonPress = () => navigation.goBack(),
    style,
    closeButtonType = 'BACK',
    buttonTitleProps,
    onBackDetail,
    diableBackButton = false,
    hasBackButton = true,
    backIconColor = Colors.WHITE,
  } = props;

  const onBackPress = () => {
    onLeftButtonPress();
    onBackDetail && onBackDetail();
  };

  return (
    <Container style={style}>
      {leftButtonComponent ? (
        <>{leftButtonComponent}</>
      ) : (
        <>
          {hasBackButton ? (
            <>
              {closeButtonType === 'BACK' ? (
                <BackButton
                  onPress={onBackPress}
                  disabled={diableBackButton}
                  backIconColor={backIconColor}
                />
              ) : (
                <CloseButton
                  onPress={onBackPress}
                  disabled={diableBackButton}
                  backIconColor={backIconColor}
                />
              )}
            </>
          ) : (
            <IconContainer />
          )}
        </>
      )}

      {customHeader ? (
        <CustomHeader>{customHeader}</CustomHeader>
      ) : (
        <TouchableWithoutFeedback {...buttonTitleProps}>
          <Title {...titleProps} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Title>
        </TouchableWithoutFeedback>
      )}

      {rightButtonComponent ? <>{rightButtonComponent}</> : <IconContainer />}
    </Container>
  );
};

export default Header;
