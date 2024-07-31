/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
// Modules
import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ActivityIndicator, FlatList } from 'react-native';

// Icons
import MenuIcon from 'assets/icons/menu-icon';

// Molecules
import Header from 'components/molecules/header';

// Styles
import { Colors, Typography } from 'styles';

// Context
import { UserContext } from 'components/context/user-context';

// Atoms
import Button from 'components/atoms/button';
import { TextTransform, translate } from 'components/atoms/localized-label';

// Styles
import { DEFAULT_THEME } from 'styles/theme';
import { client } from 'core/kanvas_client';
import { NotificationsItem } from 'components/molecules/notifications-item';

const Container = styled.View`
  flex: 1;
  background-color: ${DEFAULT_THEME.background};
`;

const ScreenHeader = styled(Header)`
  justify-content: space-between;
  align-items: center;
  background-color: ${DEFAULT_THEME.primary};
`;

const Content = styled.SafeAreaView`
  margin: 10px;
`;

// Interfaces
interface IHomeProps {
  navigation: any;
}

export const Notifications = (props: IHomeProps) => {
  // Props
  const { navigation } = props;

  // Context
  const { userData } = useContext(UserContext);

  // State
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNotifications = async () => {
    try {
      const response = await client.notifications.getNotifications();
      console.log('Notifications:', response);
      setNotifications(response);
      setLoading(false);
    } catch (error) {
      console.log('Error:', error);
      setLoading(false);
      throw new Error(`Error getting notifications: ${error}`);
    }
  };

  useEffect(() => {
    console.log('User Data:', userData);
    getNotifications();
  }, []);

  const renderItem = useCallback(({ item }) => {
    return (
      <NotificationsItem
        id={item.id}
        message={item.content}
        date={item.created_at}
        fromUser={item.fromUsers}
      />
    );
  }, []);

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  return (
    <Container>
      <ScreenHeader
        title={translate('notification', TextTransform.CAPITALIZE)}
        closeButtonType='close'
      />

      <Content>

        {loading ? (
          <ActivityIndicator
            size='large'
            color={DEFAULT_THEME.primary}
          />
        ) : (
          <FlatList
            data={notifications}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        )}

      </Content>
    </Container>
  );
};
