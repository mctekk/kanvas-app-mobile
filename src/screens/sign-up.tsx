/* eslint-disable @typescript-eslint/no-shadow */
// Modules
import React, {useState} from 'react';
import styled from 'styled-components';
import {Formik} from 'formik';
import * as yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// Molecules
import Header from 'components/molecules/header';
import TextInput from 'components/molecules/text-input';

// Styles
import {Colors} from 'styles';

// Atoms
import CustomButton from 'components/atoms/button';
import {client} from 'services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AUTH_TOKEN, REFRESH_TOKEN, USER_DATA} from 'utils/constants';

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

  const getUserData = async () => {
    try {
      const response = await client.users.getUserData();
      console.log('getUserData', response);
      AsyncStorage.setItem(USER_DATA, JSON.stringify(response));
      setIsLoading(false);
    } catch (error) {
      console.log('getUserData Error:', error);
    }
  };

  const handleRegistration = async (values: any, actions: any) => {
    console.log('values', values);
    console.log('actions', actions);
    setIsLoading(true);
    try {
      const response = await client.users.register(values);
      console.log('Register response', response);
      const {token, user} = response?.register;

      AsyncStorage.setItem(AUTH_TOKEN, token?.token);
      AsyncStorage.setItem(REFRESH_TOKEN, token?.refresh_token);
      getUserData();
    } catch (error) {
      console.log('Register Error:', error);
    }
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
