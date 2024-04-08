// Modules
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors, Typography} from 'styles';
import styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

// Atoms
import Text from 'atoms/text';
import BackButton from 'components/atoms/back-button';
import CloseButton from 'components/atoms/close-button';

export interface IProps {
  title: string;
  customHeader?: any;
  titleProps: any;
  rightButtonComponent?: any;
  leftButtonComponent?: any;
  rightButtonProps: any;
  buttonTitleProps?: any;
  style?: object;
  closeButtonType?: 'CLOSE' | 'BACK';
  onLeftButtonPress?: () => void;
  onBackDetail?: () => void;
  diableBackButton?: boolean;
}

const SCREEN_MARGIN = 15;

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${SCREEN_MARGIN}px;
  padding-bottom: ${SCREEN_MARGIN}px;
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
          {closeButtonType === 'BACK' ? (
            <BackButton onPress={onBackPress} disabled={diableBackButton} />
          ) : (
            <CloseButton onPress={onBackPress} disabled={diableBackButton} />
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
