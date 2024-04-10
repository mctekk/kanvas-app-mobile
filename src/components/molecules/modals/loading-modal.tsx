// Modules
import React, {useEffect, useState} from 'react';
import RNModal from 'react-native-modal';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

// Styles
import { Colors, Typography } from 'styles';

// Atoms
import Text from 'components/atoms/text';

type Props = {
  visible?: boolean;
  title?: string;
  photos?: Array<string>;
  type?: string;
};

const Modal = styled(RNModal)`
  padding: 0;
  margin: 0;
`;

const Container = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Title = styled(Text)`
  font-size: ${Typography.FONT_SIZE_18}px;
  line-height: ${Typography.FONT_SIZE_18}px;
  margin-top: 20px;
  margin-right: 10px;
`;

const LoadingModal = (props: Props) => {
  const {visible, title, photos = [], type} = props;

  return (
    <Modal isVisible={visible} animationIn="fadeIn" animationOut="fadeOut">
      <Container>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
        <TitleContainer>
          <Title>{title}</Title>
        </TitleContainer>
      </Container>
    </Modal>
  );
};
export default LoadingModal;
