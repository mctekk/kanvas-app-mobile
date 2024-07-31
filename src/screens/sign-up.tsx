/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
// Modules
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Molecules
import Header from 'components/molecules/header';
import TextInput from 'components/molecules/text-input';

// Styles
import { Colors } from 'styles';

// Atoms
import CustomButton from 'components/atoms/button';
import { TextTransform, translate } from 'components/atoms/localized-label';

// Api
import { client } from 'core/kanvas_client';

// Utils
import { AUTH_TOKEN, REFRESH_TOKEN, USER_DATA } from 'utils/constants';

// Context
import { AuthContext } from 'components/context/auth-context';

// Styles
import { DEFAULT_THEME } from 'styles/theme';
import kanvasService from 'core/services/kanvas-service';

// Interfaces
interface ISignUpProps {
  navigation: any;
}

const HEADER_HEIGHT = 130;

const Container = styled.View`
  flex: 1;
  background-color: ${DEFAULT_THEME.background};
`;

const ScreenHeader = styled(Header)`
  justify-content: space-between;
  align-items: center;
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
  email: yup.string().required(translate('fieldRequired', TextTransform.NONE)),
  firstname: yup
    .string()
    .required(translate('fieldRequired', TextTransform.NONE)),
  lastname: yup
    .string()
    .required(translate('fieldRequired', TextTransform.NONE)),
  displayname: yup
    .string()
    .required(translate('fieldRequired', TextTransform.NONE)),
  password: yup
    .string()
    .required(translate('fieldRequired', TextTransform.NONE)),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required(translate('fieldRequired', TextTransform.NONE)),
});

export const SignUp = (props: ISignUpProps) => {
  // States
  const [isLoading, setIsLoading] = useState(false);

  // Context
  const { signUp } = useContext(AuthContext);

  const getUserData = async (token: string, refresh_token: string) => {
    try {
      const response = await kanvasService.getUserData();
      signUp({ token, refresh_token, user: response });
      setIsLoading(false);
    } catch (error) {
      console.log('getUserData Error:', error);
    }
  };

  const handleRegistration = async (values: any, actions: any) => {
    setIsLoading(true);
    try {
      const response = await client.users.register(values);
      const { token, user } = response?.register;
      AsyncStorage.setItem(AUTH_TOKEN, token?.token);
      onRegisterSuccess(token?.token, token?.refresh_token);
    } catch (error) {
      console.log('Register Error:', error);
      onRegisterError();
      setIsLoading(false);
    }
  };

  const onRegisterSuccess = (token: string, refresh_token: string) => {
    Alert.alert(
      translate('success', TextTransform.CAPITALIZE),
      translate('registerSuccessMsg', TextTransform.CAPITALIZE),
      [
        {
          text: translate('ok', TextTransform.CAPITALIZE),
          onPress: () => getUserData(token, refresh_token),
        },
      ],
    );
  };

  const onRegisterError = () => {
    Alert.alert(
      translate('error', TextTransform.CAPITALIZE),
      translate('registerErrorMsg', TextTransform.CAPITALIZE),
    );
  };

  return (
    <Container>
      <ScreenHeader title={translate('signUp', TextTransform.CAPITALIZE)} />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => handleRegistration(values, actions)}>
        {props => (
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50 }}>
            <Content>
              <Input
                labelText={translate('email', TextTransform.CAPITALIZE)}
                placeholderText={translate('placeholderMail', TextTransform.CAPITALIZE)}
                onChangeText={props.handleChange('email')}
                error={props.errors.email}
                inputProps={{
                  keyboardType: 'email-address',
                  autoCapitalize: 'none',
                  value: props.values.email,
                }}
              />

              <Input
                labelText={translate('firstName', TextTransform.CAPITALIZE)}
                placeholderText={translate('placeholderFirstName', TextTransform.CAPITALIZE)}
                onChangeText={props.handleChange('firstname')}
                error={props.errors.firstname}
                inputProps={{
                  autoCapitalize: 'none',
                  value: props.values.firstname,
                }}
              />

              <Input
                labelText={translate('lastName', TextTransform.CAPITALIZE)}
                placeholderText={translate('placeholderLastName', TextTransform.NONE)}
                onChangeText={props.handleChange('lastname')}
                error={props.errors.lastname}
                inputProps={{
                  autoCapitalize: 'none',
                  value: props.values.lastname,
                }}
              />

              <Input
                labelText={translate('displayName', TextTransform.CAPITALIZE)}
                placeholderText={translate('placeholderDisplayName', TextTransform.NONE)}
                onChangeText={props.handleChange('displayname')}
                error={props.errors.displayname}
                inputProps={{
                  autoCapitalize: 'none',
                  value: props.values.displayname,
                }}
              />

              <Input
                labelText={translate('password', TextTransform.CAPITALIZE)}
                placeholderText={translate('placeholderPassword', TextTransform.NONE)}
                onChangeText={props.handleChange('password')}
                error={props.errors.password}
                secureTextEntry={true}
                inputProps={{
                  autoCapitalize: 'none',
                  value: props.values.password,
                }}
              />

              <Input
                labelText={translate('confirmPassword', TextTransform.CAPITALIZE)}
                placeholderText={translate('placeholderConfirmPassword', TextTransform.NONE)}
                onChangeText={props.handleChange('password_confirmation')}
                error={props.errors.password_confirmation}
                secureTextEntry={true}
                inputProps={{
                  autoCapitalize: 'none',
                  value: props.values.password_confirmation,
                }}
              />

              <Button
                title={translate('signUp', TextTransform.CAPITALIZE)}
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
