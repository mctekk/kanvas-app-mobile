/* eslint-disable react-native/no-inline-styles */
// Modules
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Molcules
import TextInput from 'components/molecules/text-input';

// Atoms
import CustomButton from 'components/atoms/button';
import Text from 'components/atoms/text';

// Organisms
import { AuthContainer } from 'components/organisms/auth-container';
import { Colors, Typography } from 'styles';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const Content = styled.View`
  margin-top: 40px;
`;

const Button = styled(CustomButton)`
  margin-top: 20px;
  width: 90px;
  height: 40px;
  position: absolute;
  bottom: 20px;
  left: 20px;
`;

const SignUpButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 40px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

const SignUpText = styled(Text)`
  font-size: ${Typography.FONT_SIZE_16}px;
  line-height: ${Typography.FONT_SIZE_22}px;
  color: ${Colors.SOFT_BLACK};
`;

// Interfaces
interface ISignInProps {
  navigation: any;
}

export const SignIn = (props: ISignInProps) => {
  const { navigation } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    navigation.navigate('HomeStack');
  };

  return (
    <>
      <AuthContainer>
        <Title>Welcome</Title>

        <Content>
          <TextInput
            labelText="Email"
            placeholderText="Enter your email"
            value={email}
            onChangeText={(text: string) => setEmail(text)}
          />

          <TextInput
            labelText="Password"
            placeholderText="Enter your password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text: string) => setPassword(text)}
            style={{ marginTop: 20 }}
          />
        </Content>

        <Button
          title="Sign In"
          onPress={handleSignIn}
          style={{ marginTop: 20 }}
        />

      </AuthContainer>

      <SignUpButton
        onPress={() => navigation.navigate('SignUp')}
      >
        <SignUpText>Sign Up Now</SignUpText>
      </SignUpButton>

    </>
  );
};
