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
import { client } from 'core/kanvas_client';

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

export const Inventory = (props: IHomeProps) => {
  // Props
  const {navigation} = props;

  // Context
  const {userData} = useContext(UserContext);

  const getInventory = async () => {
    try {
      const response = await client.inventory.getProduct();
      console.log(response);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <Container>
      <ScreenHeader title="Inventory" />

      <Content>
        <Title>Kanvas Inventory</Title>
      </Content>
    </Container>
  );
};
