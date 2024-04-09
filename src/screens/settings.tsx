/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
// Modules
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuIcon from 'assets/icons/menu-icon';
import { AuthContext } from 'components/context/auth-context';
import { UserContext } from 'components/context/user-context';
import Header from 'components/molecules/header';
import React, { useContext, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { client } from 'services/api';
import styled from 'styled-components';
import { Colors, Typography } from 'styles';
import { AUTH_TOKEN, REFRESH_TOKEN, USER_DATA } from 'utils/constants';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ScreenHeader = styled(Header)`
  height: 130px;
  justify-content: space-between;
  align-items: center;
  background-color: ${Colors.PRIMARY};
  padding-top: 30px;
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

// Interfaces
interface ISettingsProps {
  navigation: any;
}

export const Settings = (props: ISettingsProps) => {
  // Props
  const { navigation } = props;

  // Context
  const { signOut } = useContext(AuthContext);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    console.log('User Data:', userData);
  }, []);

  const LeftButtonComponent = () => (
    <IconContainer onPress={() => navigation.openDrawer()}>
      <MenuIcon />
    </IconContainer>
  );

  return (
    <Container>
      <ScreenHeader
        title="Settings"
        hasBackButton={false}
        leftButtonComponent={<LeftButtonComponent />}
      />

      <Content>
        <Title>Kanvas Settings</Title>
      </Content>
    </Container>
  );
};
