/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
// Modules
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuIcon from 'assets/icons/menu-icon';
import Button from 'components/atoms/button';
import {AuthContext} from 'components/context/auth-context';
import {UserContext} from 'components/context/user-context';
import Header from 'components/molecules/header';
import {SettingsItems} from 'components/molecules/settings-items';
import React, {useCallback, useContext, useEffect} from 'react';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {client} from 'services/api';
import styled from 'styled-components';
import {Colors, Typography} from 'styles';
import {AUTH_TOKEN, REFRESH_TOKEN, USER_DATA} from 'utils/constants';

// Interfaces
interface ISettingsProps {
  navigation: any;
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ScreenHeader = styled(Header)`
  justify-content: space-between;
  align-items: center;
  background-color: ${Colors.PRIMARY};
`;

const Content = styled.SafeAreaView`
  flex: 1px;
  margin: 10px;
`;

const Title = styled.Text`
  font-size: ${Typography.FONT_SIZE_24}px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const IconContainer = styled.TouchableOpacity`
  align-items: center;
  padding-right: 16px;
  margin-top: 10px;
`;

const LogoutButton = styled(Button)`
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  height: 50px;
  width: 50%;
  align-self: center;
  border-radius: 10px;
  background-color: ${Colors.ERROR_RED};
`;

const data = [
  {
    key: 1,
    name: 'Edit Profile',
    goTo: 'EditProfile',
  },
  {
    key: 2,
    name: 'Change Password',
    goTo: 'ChangePassword',
  },
];

export const Settings = (props: ISettingsProps) => {
  // Props
  const {navigation} = props;

  // Context
  const {signOut} = useContext(AuthContext);
  const {userData} = useContext(UserContext);

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

  const renderItem = useCallback(({item}) => {
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
        title="Settings"
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
          title="Logout"
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
