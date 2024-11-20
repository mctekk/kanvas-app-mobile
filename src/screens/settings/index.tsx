/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */

// Modules
import React, { useCallback, useContext, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';

// Icons
import MenuIcon from 'assets/icons/menu-icon';

// Atoms
import { TextTransform, translate } from 'components/atoms/localized-label';

// Context
import { AuthContext } from 'components/context/auth-context';
import { UserContext } from 'components/context/user-context';

// Molecules
import { SettingsItems } from 'components/molecules/settings-items';

// Styles
import { Colors, Typography } from 'styles';
import { 
  Container,
  Content,
  ScreenHeader,
  IconContainer,
  LogoutButton,
 } from './styles';

// Interfaces
interface ISettingsProps {
  navigation: any;
}

const data = [
  {
    key: 1,
    name: translate('editProfile', TextTransform.CAPITALIZE),
    goTo: 'EditProfile',
  },
  {
    key: 2,
    name: translate('changePassword', TextTransform.CAPITALIZE),
    goTo: 'ChangePassword',
  },
];

export const Settings = (props: ISettingsProps) => {
  // Props
  const { navigation } = props;

  // Context
  const { signOut } = useContext(AuthContext);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    console.log('User Data:', userData);
  }, []);

  const handleLogout = async () => {
    try {
      signOut();
    } catch (error) {
      console.log('Logout Error:', error);
    }
  };

  const LeftButtonComponent = () => (
    <IconContainer onPress={() => navigation.openDrawer()}>
      <MenuIcon />
    </IconContainer>
  );

  const renderItem = useCallback(({ item }) => {
    return (
      <SettingsItems
        key={item.key}
        name={item.name}
        onPress={() => navigation.navigate(item.goTo)}
      />
    );
  }, []);

  const keyExtractor = useCallback(item => item.key.toString(), []);

  return (
    <Container>
      <ScreenHeader
        title={translate('settings', TextTransform.CAPITALIZE)}
        leftButtonComponent={<LeftButtonComponent />}
      />

      <Content>
        <FlatList
          data={data}
          extraData={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />

        <LogoutButton
          onPress={handleLogout}
          title={translate('logout', TextTransform.CAPITALIZE)}
          textStyle={{
            color: Colors.WHITE,
            fontSize: Typography.FONT_SIZE_16,
            fontWeight: 'bold',
          }}
        />
      </Content>
    </Container>
  );
};
