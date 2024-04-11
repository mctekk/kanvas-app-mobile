// Modules
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Alert, StyleSheet } from 'react-native';

// Molecules
import Header from 'components/molecules/header';
import TextInput from 'components/molecules/text-input';

// Styles
import { Colors, Typography } from 'styles';

// Atoms
import Text from 'components/atoms/text';
import Button from 'components/atoms/button';
import { client } from 'services/api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoadingModal from 'components/molecules/modals/loading-modal';

// Interfaces
interface IForgotPasswordProps {
  navigation: any;
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ScreenHeader = styled(Header)`
  justify-content: space-between;
  align-items: center;
  background-color: ${Colors.PRIMARY};
`;

const Content = styled(KeyboardAwareScrollView)`
  margin-top: -30px;
`;

const Title = styled(Text)`
  font-size: ${Typography.FONT_SIZE_22}px;
  line-height: ${Typography.FONT_SIZE_24}px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 5px;
`;

const Subtitle = styled(Text)`
  font-size: ${Typography.FONT_SIZE_14}px;
  line-height: ${Typography.FONT_SIZE_24}px;
  color: #333;
  text-align: center;
  margin-bottom: 15px;
`;

const Input = styled(TextInput)`
  width: 75%;
`;

const SendButton = styled(Button)`
  width: 50%;
  height: 40px;
  border-radius: 5px;
`;

const initialValues = {
  email: '',
};

const validationSchema = yup.object().shape({
  email: yup.string().required('This field is requiered'),
});

export const ForgotPassword = (props: IForgotPasswordProps) => {
  // Props
  const { navigation } = props;

  // State
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (values: any, actions: any) => {
    setIsLoading(true);
    try {
      const response = await client.users.forgotPassword(values.email);
      Alert.alert('Success', 'Password reset email sent successfully', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('Forgot Password Error:', error);
      Alert.alert('Error', 'An error occurred while sending the email');
    }
  };

  return (
    <Container>
      <ScreenHeader title="Forgot Password" />

      <Content contentContainerStyle={styles.contentContainerStyle}>
        <Title>Forgot your password?</Title>
        <Subtitle>Enter your email for password recovery</Subtitle>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => handleForgotPassword(values, actions)}>
          {props => (
            <>
              <Input
                labelText="What's your email?"
                placeholderText="Enter your email"
                labelFontSize={Typography.FONT_SIZE_12}
                onChangeText={props.handleChange('email')}
                error={props.errors.email}
                inputProps={{
                  keyboardType: 'email-address',
                  autoCapitalize: 'none',
                  value: props.values.email,
                }}
                labelStyle={styles.labelStyle}
                inputStyle={styles.inputStyle}
              />

              <SendButton
                title="Send Email"
                onPress={props.handleSubmit}
                style={{ marginTop: 20 }}
                loading={isLoading}
                disabled={isLoading}
              />
            </>
          )}
        </Formik>
      </Content>

      <LoadingModal visible={isLoading} />

    </Container>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  labelStyle: {
    fontSize: Typography.FONT_SIZE_14,
    lineHeight: Typography.FONT_SIZE_16,
  },
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
});
