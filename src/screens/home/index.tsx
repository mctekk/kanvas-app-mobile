// Modules
import React, { useContext, useEffect } from 'react';
import { Title } from 'react-native-paper';

// Icons
import MenuIcon from 'assets/icons/menu-icon';

// Context
import { AuthContext } from 'components/context/auth-context';
import { UserContext } from 'components/context/user-context';

// Atoms
import Button from 'components/atoms/button';
import { TextTransform, translate } from 'components/atoms/localized-label';

import BellV2 from 'assets/icons/bell';

// Styles
import {
  IconContainer,
  Container,
  ScreenHeader,
  Content,
  UserInfoContainer,
  InfoText,
} from './styles';

// Interfaces
interface IHomeProps {
  navigation: any;
}

const LeftButtonComponent = ({ navigation }: { navigation: any }) => (
  <IconContainer onPress={() => navigation.openDrawer()}>
    <MenuIcon />
  </IconContainer>
);

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

  const RightComponent = () => (
    <IconContainer onPress={openNotifications}>
      <BellV2 />
    </IconContainer>
  );

  return (
    <Container>
      <ScreenHeader
        title={translate('home', TextTransform.CAPITALIZE)}
        leftButtonComponent={<LeftButtonComponent navigation={navigation} />}
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
