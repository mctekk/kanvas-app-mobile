/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
// Modules
import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

// Styles
import { DEFAULT_THEME } from 'styles/theme';
import Text from 'components/atoms/text';
import { Typography } from 'styles';

const Container = styled.TouchableOpacity`
  background-color: ${DEFAULT_THEME.background};
  border-bottom-width: 1px;
  margin-bottom: 10px;
`;


const Title = styled(Text)`
  font-size: ${Typography.FONT_SIZE_14}px;
  color: ${DEFAULT_THEME.text};
  margin-bottom: 20px;
`;

const Date = styled(Text)`
  font-size: ${Typography.FONT_SIZE_12}px;
  color: ${DEFAULT_THEME.text};
  margin-bottom: 20px;
  text-align: right;
`;

// Interfaces
interface INotificationItem {
  navigation: any;
  id: string;
  message: string;
  fromUser: string;
  date: string;
}

export const NotificationsItem = (props: INotificationItem) => {

  const {
    navigation,
    id,
    message,
    fromUser,
    date,
  } = props;

  return (
    <Container>
      <Title
        numberOfLines={2}
        ellipsizeMode="tail"
      >{message}</Title>


      <Date>{moment(date).format('MMM D')}</Date>
    </Container>
  );
};
