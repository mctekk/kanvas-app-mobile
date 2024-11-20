import React from 'react';
import styled from 'styled-components/native';

// Molecules
import Header from 'components/molecules/header';

// Styles
import {Colors, Typography} from 'styles';


export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const ScreenHeader = styled(Header)`
  justify-content: space-between;
  align-items: center;
  background-color: ${Colors.PRIMARY};
`;

export const Content = styled.SafeAreaView`
  flex: 1px;
  margin: 10px;
`;

export const Title = styled.Text`
  font-size: ${Typography.FONT_SIZE_24}px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

export const UserInfoContainer = styled.View`
  justify-content: center;
`;

export const InfoText = styled.Text`
  font-size: ${Typography.FONT_SIZE_16}px;
  line-height: ${Typography.FONT_SIZE_18}px;
  color: ${Colors.SOFT_BLACK};
  margin-vertical: 2px;
`;

export const IconContainer = styled.TouchableOpacity`
  align-items: center;
  padding-right: 16px;
  margin-top: 10px;
`;
