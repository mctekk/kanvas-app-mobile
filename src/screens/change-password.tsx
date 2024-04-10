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
import {UserContext} from 'components/context/user-context';
import LoadingModal from 'components/molecules/modals/loading-modal';

// Interfaces
interface IChangePasswordProps {
  navigation: any;
}

const HEADER_HEIGHT = 130;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ScreenHeader = styled(Header)`
  height: ${HEADER_HEIGHT}px;
  justify-content: space-between;
  align-items: center;
  background-color: ${Colors.PRIMARY};
  padding-top: 30px;
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
  current_password: '',
  new_password: '',
  new_password_confirmation: '',
};

const validationSchema = yup.object().shape({
  current_password: yup.string().required('This field is requiered'),
  new_password: yup.string().required('This field is requiered'),
  new_password_confirmation: yup
    .string()
    .oneOf([yup.ref('new_password')], 'Passwords do not match')
    .required('This field is requiered.'),
});

export const ChangePassword = (props: IChangePasswordProps) => {
  // States
  const [isLoading, setIsLoading] = useState(false);

  // Context
  const {userData} = useContext(UserContext);
  const {signOut} = useContext(AuthContext);

  const onUserLogout = async () => {
    signOut();
  };

  const updatePassword = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await client.auth.changePassword(
        values.current_password,
        values.new_password,
        values.new_password_confirmation,
      );
      setIsLoading(false);
      Alert.alert('Success', 'Password updated successfully', [
        {text: 'OK', onPress: () => onUserLogout()},
      ]);
    } catch (error) {
      console.log('Error:', error);
      setIsLoading(false);
      Alert.alert('Error', 'An error occurred while updating your password');
    }
  };

  return (
    <Container>
      <ScreenHeader title="Edit Profile" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => updatePassword(values, actions)}>
        {props => (
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 50}}>
            <Content>
              <Input
                labelText="Current Password"
                placeholderText="Enter your current password"
                onChangeText={props.handleChange('current_password')}
                error={props.errors.current_password}
                secureTextEntry={true}
                inputProps={{
                  autoCapitalize: 'none',
                  value: props.values.current_password,
                }}
              />

              <Input
                labelText="New Password"
                placeholderText="Enter your new password"
                onChangeText={props.handleChange('new_password')}
                error={props.errors.new_password}
                secureTextEntry={true}
                inputProps={{
                  autoCapitalize: 'none',
                  value: props.values.new_password,
                }}
              />

              <Input
                labelText="Confirm new Password"
                placeholderText="Confirm your new password"
                onChangeText={props.handleChange('new_password_confirmation')}
                error={props.errors.new_password_confirmation}
                secureTextEntry={true}
                inputProps={{
                  autoCapitalize: 'none',
                  value: props.values.new_password_confirmation,
                }}
              />

              <Button
                title="Change Password"
                onPress={props.handleSubmit}
                loading={isLoading}
                disabled={isLoading}
              />
            </Content>
          </KeyboardAwareScrollView>
        )}
      </Formik>

      <LoadingModal visible={isLoading} title="Saving changes..." />
    </Container>
  );
};
