// Modules
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from 'components/context/auth-context';
import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { client } from 'services/api';
import styled from 'styled-components';
import { AUTH_TOKEN, REFRESH_TOKEN, USER_DATA } from 'utils/constants';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

// Interfaces
interface IHomeProps {
  navigation: any;
}

export const Home = (props: IHomeProps) => {
  // Props
  const { navigation } = props;

  // Context
  const { signOut } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      signOut();
    } catch (error) {
      console.log('Logout Error:', error);
    }
  };

  return (
    <Container>
      <Title>Kanvas Home</Title>

      <TouchableOpacity onPress={handleLogout}>
        <Title>Logout</Title>
      </TouchableOpacity>
    </Container>
  );
};
