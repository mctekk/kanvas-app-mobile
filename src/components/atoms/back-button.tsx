// Modules
import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

// Atoms
import BackArrow from 'assets/icons/back-arrow';

// Constants
import {TOUCHABLE_AREA} from 'utils/constants';

const BackButtonContainer = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding-right: 16px;
`;

const BackButton = (props: TouchableOpacityProps) => {
  const {onPress} = props;
  return (
    <BackButtonContainer onPress={onPress} hitSlop={TOUCHABLE_AREA} {...props}>
      <BackArrow />
    </BackButtonContainer>
  );
};

export default BackButton;
