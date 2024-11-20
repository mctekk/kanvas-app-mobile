/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
// Modules
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

// Molcules
import TextInput from 'components/molecules/text-input';
import LoadingModal from 'components/molecules/modals/loading-modal';
import SignWithApple from 'components/molecules/sign-with-apple-button';
import SignWithFacebook from 'components/molecules/sign-with-facebook-button';
import SignWithGoogle from 'components/molecules/sign-with-google-button';

// Atoms
import { TextTransform, translate } from 'components/atoms/localized-label';

// Organisms
import { AuthContainer } from 'components/organisms/auth-container';

// Styles
import { Colors, Typography } from 'styles';
import { 
  Title,
  Content,
  Button,
  ForgotPasswordButton,
  SignUpButton,
  SignUpText,
  SocialContainer,
 } from './styles';

// Services
import authService from 'core/services/auth-service';
import userService from 'core/services/user-service';

// Constants
import { AUTH_TOKEN } from 'utils/constants';

// Context
import { AuthContext } from 'components/context/auth-context';

// Interfaces
interface ISignInProps {
  navigation: any;
}

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = yup.object().shape({
  email: yup.string().required(translate('fieldRequired', TextTransform.NONE)),
  password: yup
    .string()
    .required(translate('fieldRequired', TextTransform.NONE)),
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
      const response = await userService.getUserData();
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
      const response = await authService.onSignIn(values);
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
    Alert.alert(
      translate('error', TextTransform.CAPITALIZE),
      translate('errorMsg', TextTransform.CAPITALIZE),
    );
  };

  const onSocialLogin = async (provider: string, authToken: any) => {
    setIsLoading(true);
    try {
      const response = await authService.onSocialLogin(provider, authToken);
      const { token, refresh_token } = response.socialLogin;
      await AsyncStorage.setItem(AUTH_TOKEN, token);
      getUserData(token, refresh_token);
    } catch (error) {
      console.log('Social Login Error:', error);
      setIsLoading(false);
      throw new Error(`Social Login Error: ${error}`);
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
            <Title>{translate('welcome', TextTransform.CAPITALIZE)}</Title>
            <Content>
              <TextInput
                labelText={translate('email', TextTransform.CAPITALIZE)}
                placeholderText={translate(
                  'placeholderMail',
                  TextTransform.CAPITALIZE,
                )}
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
                placeholderText={translate(
                  'placeholderPassword',
                  TextTransform.CAPITALIZE,
                )}
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

            <SocialContainer>
              {Platform.OS === 'ios' && (
                <SignWithApple isSmall onLogin={onSocialLogin} />
              )}
              <SignWithFacebook isSmall onLogin={onSocialLogin} />
              <SignWithGoogle isSmall onLogin={onSocialLogin} />
            </SocialContainer>

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
        <SignUpText>
          {translate('signUpNow', TextTransform.CAPITALIZE)}
        </SignUpText>
      </SignUpButton>

      <LoadingModal
        visible={isLoading}
        title={translate('signingIn', TextTransform.CAPITALIZE)}
      />
    </>
  );
};
