// Modules
import React from 'react';
import styled from 'styled-components/native';

// Styles
import { DEFAULT_THEME } from 'styles/theme';

// Molecules
import Header from 'components/molecules/header';
import TextInput from 'components/molecules/text-input';

// Atoms
import CustomButton from 'components/atoms/button';

const HEADER_HEIGHT = 130;

export const Container = styled.View`
  flex: 1;
  background-color: ${DEFAULT_THEME.background};
`;

export const ScreenHeader = styled(Header)`
  height: ${HEADER_HEIGHT}px;
  justify-content: space-between;
  align-items: center;
  background-color: ${DEFAULT_THEME.primary};
  padding-top: 30px;
`;

export const Content = styled.View`
  padding: 20px;
  flex: 1;
`;

export const Input = styled(TextInput)`
  margin-top: 20px;
`;

export const Button = styled(CustomButton)`
  height: 50px;
  border-radius: 5px;
`;
