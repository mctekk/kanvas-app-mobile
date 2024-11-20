// Modules
import React, { useContext, useEffect } from 'react';

// Context
import { UserContext } from 'components/context/user-context';

// Core
import { client } from 'core/kanvas_client';

// Styles
import {
  Container,
  ScreenHeader,
  Content,
  Title,
} from './styles';


// Interfaces
interface IInventoryScreenProps {
  navigation: any;
}

export const Inventory = (props: IInventoryScreenProps) => {
  // Props
  const { navigation } = props;

  // Context
  const { userData } = useContext(UserContext);

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
