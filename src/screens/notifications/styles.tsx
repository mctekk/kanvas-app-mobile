// Modules
import styled from 'styled-components/native';

// Molecules
import Header from 'components/molecules/header';

// Styles
import { Colors, Typography } from 'styles';
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

export const Content = styled.SafeAreaView`
  margin: 10px;
`;
