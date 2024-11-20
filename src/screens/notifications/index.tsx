/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
// Modules
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

// Context
import { UserContext } from 'components/context/user-context';

// Atoms
import { TextTransform, translate } from 'components/atoms/localized-label';

// Styles
import { client } from 'core/kanvas_client';
import {
  Container,
  ScreenHeader,
  Content,
} from './styles';
import { DEFAULT_THEME } from 'styles/theme';

// Molecules
import { NotificationsItem } from 'components/molecules/notifications-item';


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
        closeButtonType="close"
      />

      <Content>

        {loading ? (
          <ActivityIndicator
            size="large"
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
