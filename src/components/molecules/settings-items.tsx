// Modules
import React, {useContext, useEffect} from 'react';
import styled from 'styled-components';

// Styles
import {Colors, Typography} from 'styles';

// Atoms
import Text from 'components/atoms/text';

// Icons
import BackArrow from 'assets/icons/back-arrow';

const Container = styled.TouchableOpacity`
  background-color: ${Colors.WHITE};
  border-width: 1px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Title = styled(Text)`
  font-size: ${Typography.FONT_SIZE_16}px;
  line-height: ${Typography.FONT_SIZE_18}px;
  color: ${Colors.SOFT_BLACK};
  font-weight: 600;
`;

const IconContainer = styled.View`
  height: 30px;
  width: 30px;
  justify-content: center;
  align-items: center;
`;

// Interfaces
interface ISettingsItemsProps {
  name: string;
  route: string;
  navigation: any;
}

export const SettingsItems = (props: ISettingsItemsProps) => {
  // Props
  const {navigation, name, route} = props;

  return (
    <Container {...props}>
      <Title>{name}</Title>

      <IconContainer
        style={{
          transform: [{rotate: '180deg'}],
        }}>
        <BackArrow color={Colors.PRIMARY} />
      </IconContainer>
    </Container>
  );
};
