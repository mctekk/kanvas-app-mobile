// Modules
import KanvasLogo from 'assets/icons/kanvas-logo';
import React, { ReactNode } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styled from 'styled-components/native';

// Assets


// Styles
import { Colors } from 'styles';

export interface IAuthContainer {
  children: ReactNode;
}

export const AppContainerView = styled.View`
  justify-content: center;
  flex: 1;
`;

export const FormContainer = styled.View`
  background-color: ${Colors.WHITE};
  margin-horizontal: 20px;
  min-height: 380px;
  padding: 24px;
  border-radius: 6px;
  border-width: 0.5px;
  border-color: #a7a9ad;
`;

export const ContentView = styled.View`
  flex: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  justify-content: center;
  margin-top: 100px;
`;

export const LogoContainer = styled.View`
  align-items: center;
  margin-bottom: 54px;
`;

export const Image = styled.Image`
  flex: 0.4;
  width: 100%;
`;

export const WhiteBox = styled.View`
  background-color: ${Colors.WHITE};
  flex: 0.6;
`;

export const AuthContainer = ({ children }: IAuthContainer) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <AppContainerView>
      <>
        <Image
          source={require('assets/images/background.png')}
          resizeMode="cover"
        />
        <WhiteBox />
        <ContentView>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            extraScrollHeight={100}
          >
            <LogoContainer>
              <KanvasLogo />
            </LogoContainer>
            <FormContainer>
              {children}
            </FormContainer>
          </KeyboardAwareScrollView>
        </ContentView>
      </>
    </AppContainerView>
  );
};
