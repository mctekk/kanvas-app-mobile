/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
// Modules
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Formik} from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Molcules
import TextInput from 'components/molecules/text-input';

// Atoms
import CustomButton from 'components/atoms/button';
import Text from 'components/atoms/text';

// Organisms
import {AuthContainer} from 'components/organisms/auth-container';

// Styles
import {Colors, Typography} from 'styles';

// Services
import {client} from 'services/api';

// Constants
import {AUTH_TOKEN, REFRESH_TOKEN, USER_DATA} from 'utils/constants';

// Interfaces
interface ISignInProps {
  navigation: any;
}

const Title = styled(Text)`
  font-size: ${Typography.FONT_SIZE_24}px;
  line-height: ${Typography.FONT_SIZE_32}px;
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

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = yup.object().shape({
  email: yup.string().required('This field is requiered'),
  password: yup.string().required('This field is requiered'),
});

export const SignIn = (props: ISignInProps) => {
  // Props
  const {navigation} = props;

  // States
  const [isLoading, setIsLoading] = useState(false);

  const getUserData = async () => {
    try {
      const response = await client.users.getUserData();
      console.log('Get User Data Response:', response);
      AsyncStorage.setItem(USER_DATA, JSON.stringify(response));
      setIsLoading(false);
      navigation.navigate('HomeStack');
    } catch (error) {
      console.log('Get User Data Error:', error);
    }
  };

  const handleSignIn = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await client.auth.login(values.email, values.password);
      console.log('Login Response:', response);
      const {token, refresh_token} = response;
      AsyncStorage.setItem(AUTH_TOKEN, token);
      AsyncStorage.setItem(REFRESH_TOKEN, refresh_token);
      getUserData();
    } catch (error) {
      console.log('Login Error:', error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => handleSignIn(values, actions)}>
        {props => (
          <AuthContainer>
            <Title>Welcome</Title>
            <Content>
              <TextInput
                labelText="Email"
                placeholderText="Enter your email"
                onChangeText={props.handleChange('email')}
                inputProps={{
                  keyboardType: 'email-address',
                  autoCapitalize: 'none',
                  value: props.values.email,
                }}
              />

              <TextInput
                labelText="Password"
                placeholderText="Enter your password"
                style={{marginTop: 20}}
                onChangeText={props.handleChange('password')}
                secureTextEntry={true}
                inputProps={{
                  autoCapitalize: 'none',
                  value: props.values.password,
                }}
              />
            </Content>
            <Button
              title="Sign In"
              onPress={props.handleSubmit}
              loading={isLoading}
              disabled={isLoading}
              style={{marginTop: 20}}
            />
          </AuthContainer>
        )}
      </Formik>
      <SignUpButton onPress={() => navigation.navigate('SignUp')}>
        <SignUpText>Sign Up Now</SignUpText>
      </SignUpButton>
    </>
  );
};
