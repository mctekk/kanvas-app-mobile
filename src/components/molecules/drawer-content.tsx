import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import styled from 'styled-components';
import KanvasLogoColor from 'assets/icons/kanvas-logo-color';
import { Colors } from 'styles';

interface IDrawerContentProps {
  navigation: any;
}

const Container = styled.View`
  width: 100%;
  height: 250px;
  background-color: ${Colors.PRIMARY};
  margin-top: -80px;
  padding-top: 40px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const DrawerContent = (props: IDrawerContentProps) => {
  return (
    <DrawerContentScrollView {...props}>

      <Container>
        <KanvasLogoColor />
      </Container>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};
