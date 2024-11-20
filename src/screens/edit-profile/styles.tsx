// Modules
import React from 'react';
import styled from 'styled-components/native';

// Molecules
import Header from 'components/molecules/header';
import TextInput from 'components/molecules/text-input';

// Atoms
import CustomButton from 'components/atoms/button';

// Styles
import { DEFAULT_THEME } from 'styles/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${DEFAULT_THEME.background};
`;

export const ScreenHeader = styled(Header)`
  justify-content: space-between;
  align-items: center;
  background-color: ${DEFAULT_THEME.primary};
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
