/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
// Modules
import React, {useContext, useEffect} from 'react';
import styled from 'styled-components';

// Icons
import MenuIcon from 'assets/icons/menu-icon';

// Molecules
import Header from 'components/molecules/header';

// Styles
import {Colors, Typography} from 'styles';

// Context
import {AuthContext} from 'components/context/auth-context';
import {UserContext} from 'components/context/user-context';

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

const UserInfoContainer = styled.View`
  justify-content: center;
`;

const InfoText = styled.Text`
  font-size: ${Typography.FONT_SIZE_16}px;
  line-height: ${Typography.FONT_SIZE_18}px;
  color: ${Colors.SOFT_BLACK};
  margin-vertical: 2px;
`;

const IconContainer = styled.TouchableOpacity`
  align-items: center;
  padding-right: 16px;
  margin-top: 10px;
`;

// Interfaces
interface IHomeProps {
  navigation: any;
}

export const Home = (props: IHomeProps) => {
  // Props
  const {navigation} = props;

  // Context
  const {signOut} = useContext(AuthContext);
  const {userData} = useContext(UserContext);

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
        title="Home"
        leftButtonComponent={<LeftButtonComponent />}
      />

      <Content>
        <Title>Kanvas Home</Title>

        <UserInfoContainer>
          <InfoText>Id: {userData?.id}</InfoText>
          <InfoText>First Name: {userData?.firstname}</InfoText>
          <InfoText>Last Name: {userData?.lastname}</InfoText>
          <InfoText>Email: {userData?.email}</InfoText>
          <InfoText>Display Name: {userData?.displayname}</InfoText>
        </UserInfoContainer>
      </Content>
    </Container>
  );
};
