// Modules
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components';

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

  return (
    <Container>
      <Title>Kanvas Home</Title>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
      >
        <Title>Go Back</Title>
      </TouchableOpacity>
    </Container>
  );
};
