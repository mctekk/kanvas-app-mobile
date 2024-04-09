/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
// Modules
import React, {useContext, useState} from 'react';
import styled from 'styled-components';
import {Formik} from 'formik';
import * as yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Alert} from 'react-native';

// Molecules
import Header from 'components/molecules/header';
import TextInput from 'components/molecules/text-input';

// Styles
import {Colors} from 'styles';

// Atoms
import CustomButton from 'components/atoms/button';

// Api
import {client} from 'services/api';

// Utils
import {AUTH_TOKEN, REFRESH_TOKEN, USER_DATA} from 'utils/constants';

// Context
import {AuthContext} from 'components/context/auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Interfaces
interface ISignUpProps {
  navigation: any;
}

const HEADER_HEIGHT = 160;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ScreenHeader = styled(Header)`
  height: ${HEADER_HEIGHT}px;
  justify-content: space-between;
  align-items: center;
  background-color: ${Colors.SOFT_BLUE};
`;

const Content = styled.View`
  padding: 20px;
  flex: 1;
`;

const Input = styled(TextInput)`
  margin-top: 20px;
`;

const Button = styled(CustomButton)`
  height: 50px;
  border-radius: 5px;
`;

const initialValues = {
  email: '',
  firstname: '',
  lastname: '',
  displayname: '',
  password: '',
  password_confirmation: '',
};

const validationSchema = yup.object().shape({
  email: yup.string().required('This field is requiered'),
  firstname: yup.string().required('This field is requiered'),
  lastname: yup.string().required('This field is requiered'),
  displayname: yup.string().required('This field is requiered'),
  password: yup.string().required('This field is requiered'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('This field is requiered.'),
});

export const SignUp = (props: ISignUpProps) => {
  // States
  const [isLoading, setIsLoading] = useState(false);

  // Context
  const {signUp} = useContext(AuthContext);

  const getUserData = async (token: string, refresh_token: string) => {
    try {
      const response = await client.users.getUserData();
      console.log('getUserData', response);
      signUp({token, refresh_token, user: response});
      setIsLoading(false);
    } catch (error) {
      console.log('getUserData Error:', error);
    }
  };

  const handleRegistration = async (values: any, actions: any) => {
    setIsLoading(true);
    try {
      const response = await client.users.register(values);
      console.log('Register response', response);
      const {token, user} = response?.register;
      AsyncStorage.setItem(AUTH_TOKEN, token?.token);
      onRegisterSuccess(token?.token, token?.refresh_token);
    } catch (error) {
      console.log('Register Error:', error);
      onRegisterError();
      setIsLoading(false);
    }
  };

  const onRegisterSuccess = (token: string, refresh_token: string) => {
    Alert.alert('Success', 'You have successfully registered', [
      {
        text: 'OK',
        onPress: () => getUserData(token, refresh_token),
      },
    ]);
  };

  const onRegisterError = () => {
    Alert.alert('Error', 'An error occurred while registering');
  };

  return (
    <Container>
      <ScreenHeader title="Sign Up" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => handleRegistration(values, actions)}>
        {props => (
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 50}}>
            <Content>
              <Input
                labelText="Email"
                placeholderText="Enter your email"
                onChangeText={props.handleChange('email')}
                error={props.errors.email}
                inputProps={{
                  keyboardType: 'email-address',
                  autoCapitalize: 'none',
                  value: props.values.email,
                }}
              />

              <Input
                labelText="Firstname"
                placeholderText="Enter your firstname"
                onChangeText={props.handleChange('firstname')}
                error={props.errors.firstname}
                inputProps={{
                  autoCapitalize: 'none',
                  value: props.values.firstname,
                }}
              />

              <Input
                labelText="Lastname"
                placeholderText="Enter your lastname"
                onChangeText={props.handleChange('lastname')}
                error={props.errors.lastname}
                inputProps={{
                  autoCapitalize: 'none',
                  value: props.values.lastname,
                }}
              />

              <Input
                labelText="Displayname"
                placeholderText="Enter your displayname"
                onChangeText={props.handleChange('displayname')}
                error={props.errors.displayname}
                inputProps={{
                  autoCapitalize: 'none',
                  value: props.values.displayname,
                }}
              />

              <Input
                labelText="Password"
                placeholderText="Enter your password"
                onChangeText={props.handleChange('password')}
                error={props.errors.password}
                secureTextEntry={true}
                inputProps={{
                  autoCapitalize: 'none',
                  value: props.values.password,
                }}
              />

              <Input
                labelText="Confirm Password"
                placeholderText="Confirm your password"
                onChangeText={props.handleChange('password_confirmation')}
                error={props.errors.password_confirmation}
                secureTextEntry={true}
                inputProps={{
                  autoCapitalize: 'none',
                  value: props.values.password_confirmation,
                }}
              />

              <Button
                title="Sign Up"
                onPress={props.handleSubmit}
                loading={isLoading}
                disabled={isLoading}
              />
            </Content>
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </Container>
  );
};
