/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
// Modules
import React, { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

// Molcules
import TextInput from 'components/molecules/text-input';

// Atoms
import CustomButton from 'components/atoms/button';
import Text from 'components/atoms/text';

// Organisms
import { AuthContainer } from 'components/organisms/auth-container';

// Styles
import { Colors, Typography } from 'styles';

// Services
import { client } from 'services/api';

// Constants
import { AUTH_TOKEN, REFRESH_TOKEN, USER_DATA } from 'utils/constants';
import { AuthContext } from 'components/context/auth-context';
import LoadingModal from 'components/molecules/modals/loading-modal';
import { TextTransform, translate } from 'components/atoms/localized-label';

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
  width: 100%;
  height: 40px;
`;

const ForgotPasswordButton = styled(CustomButton)`
  top: 20px;
  background-color: 'rgba(52, 52, 52, 0)';
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
  email: yup.string().required(translate('fieldRequired', TextTransform.NONE)),
  password: yup.string().required(translate('fieldRequired', TextTransform.NONE)),
});

export const SignIn = (props: ISignInProps) => {
  // Props
  const { navigation } = props;

  // States
  const [isLoading, setIsLoading] = useState(false);

  // Context
  const { signIn } = useContext(AuthContext);

  useEffect(() => {
    console.log('Config:', Config.APP_CONFIG);
  }, []);

  const getUserData = async (token: string, refresh_token: string) => {
    try {
      const response = await client.users.getUserData();
      console.log('Get User Data Response:', response);
      signIn({ token, refresh_token, user: response });
      setIsLoading(false);
    } catch (error) {
      console.log('Get User Data Error:', error);
      setIsLoading(false);
      onLoginError();
    }
  };

  const handleSignIn = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await client.auth.login(values.email, values.password);
      console.log('Login Response:', response);
      const { token, refresh_token } = response;
      await AsyncStorage.setItem(AUTH_TOKEN, token);
      getUserData(token, refresh_token);
    } catch (error) {
      console.log('Login Error:', error);
      setIsLoading(false);
      onLoginError();
    }
  };

  const onLoginError = () => {
    Alert.alert(translate('error', TextTransform.CAPITALIZE), translate('errorMsg', TextTransform.CAPITALIZE));
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => handleSignIn(values, actions)}>
        {props => (
          <AuthContainer>
            <Title>{translate('welcome', TextTransform.CAPITALIZE)}</Title>
            <Content>
              <TextInput
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

              <TextInput
                labelText={translate('password', TextTransform.CAPITALIZE)}
                placeholderText={translate('placeholderPassword', TextTransform.CAPITALIZE)}
                style={{ marginTop: 20 }}
                onChangeText={props.handleChange('password')}
                secureTextEntry={true}
                error={props.errors.password}
                inputProps={{
                  autoCapitalize: 'none',
                  value: props.values.password,
                }}
              />
            </Content>
            <Button
              title={translate('signIn', TextTransform.CAPITALIZE)}
              onPress={props.handleSubmit}
              disabled={isLoading}
              style={{ marginTop: 20 }}
            />

            <ForgotPasswordButton
              title={translate('forgotPassword', TextTransform.CAPITALIZE)}
              onPress={() => navigation.navigate('ForgotPassword')}
              style={{ marginTop: 10 }}
              textStyle={{
                color: Colors.PRIMARY,
                fontSize: Typography.FONT_SIZE_13,
              }}
            />
          </AuthContainer>
        )}
      </Formik>
      <SignUpButton onPress={() => navigation.navigate('SignUp')}>
        <SignUpText>{translate('signUpNow', TextTransform.CAPITALIZE)}</SignUpText>
      </SignUpButton>

      <LoadingModal visible={isLoading} title={translate('signingIn', TextTransform.CAPITALIZE)} />
    </>
  );
};
