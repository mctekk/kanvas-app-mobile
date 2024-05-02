/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
// Modules
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

// Icons
import MenuIcon from 'assets/icons/menu-icon';

// Molecules
import Header from 'components/molecules/header';

// Styles
import { Colors, Typography } from 'styles';

// Context
import { AuthContext } from 'components/context/auth-context';
import { UserContext } from 'components/context/user-context';

// Atoms
import Button from 'components/atoms/button';
import { TextTransform, translate } from 'components/atoms/localized-label';

// Styles
import { DEFAULT_THEME } from 'styles/theme';
import BellV2 from 'assets/icons/bell';

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
  flex: 1px;
  margin: 10px;
`;

const Title = styled.Text`
  font-size: ${Typography.FONT_SIZE_24}px;
  font-weight: bold;
  color: ${DEFAULT_THEME.text};
  text-align: center;
  margin-bottom: 20px;
`;

const UserInfoContainer = styled.View`
  justify-content: center;
`;

const InfoText = styled.Text`
  font-size: ${Typography.FONT_SIZE_16}px;
  line-height: ${Typography.FONT_SIZE_18}px;
  color: ${DEFAULT_THEME.text};
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
  const { navigation } = props;

  // Context
  const { signOut } = useContext(AuthContext);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    // TESTING PURPOSES
    console.log('User Data:', userData);
  }, []);

  const openNotifications = () => {
    navigation.navigate('Notifications');
  };

  const LeftButtonComponent = () => (
    <IconContainer onPress={() => navigation.openDrawer()}>
      <MenuIcon />
    </IconContainer>
  );

  const RightComponent = () => (
    <IconContainer onPress={openNotifications}>
      <BellV2 />
    </IconContainer>
  );

  return (
    <Container>
      <ScreenHeader
        title={translate('home', TextTransform.CAPITALIZE)}
        leftButtonComponent={<LeftButtonComponent />}
        rightButtonComponent={<RightComponent />}
      />

      <Content>
        <Title>Kanvas Home</Title>

        <UserInfoContainer>
          <InfoText>{translate('id', TextTransform.CAPITALIZE)}: {userData?.id}</InfoText>
          <InfoText>{translate('firstName', TextTransform.CAPITALIZE)}: {userData?.firstname}</InfoText>
          <InfoText>{translate('lastName', TextTransform.CAPITALIZE)}: {userData?.lastname}</InfoText>
          <InfoText>{translate('email', TextTransform.CAPITALIZE)}: {userData?.email}</InfoText>
          <InfoText>{translate('displayName', TextTransform.CAPITALIZE)}: {userData?.displayname}</InfoText>
        </UserInfoContainer>

        <Button
          title='Go to Inventory Screen'
          onPress={() => navigation.navigate('Inventory')}
        />

      </Content>
    </Container>
  );
};
