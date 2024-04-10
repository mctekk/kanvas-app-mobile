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
interface IEditProfileProps {
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

const validationSchema = yup.object().shape({
  email: yup.string().required('This field is requiered'),
  firstname: yup.string().required('This field is requiered'),
  lastname: yup.string().required('This field is requiered'),
  displayname: yup.string().required('This field is requiered'),
});

export const EditProfile = (props: IEditProfileProps) => {
  // States
  const [isLoading, setIsLoading] = useState(false);

  // Context
  const {userData} = useContext(UserContext);

  const initialValues = {
    email: userData?.email || '',
    firstname: userData?.firstname || '',
    lastname: userData?.lastname || '',
    displayname: userData?.displayname || '',
  };

  const updateUserProfile = async (values: any) => {
    console.log('Values:', values);
    setIsLoading(true);

    const dataToUpdate = {
      firstname: values.firstname,
      lastname: values.lastname,
      // displayname: values.displayname,
      phone_number: '8093333833',
      cell_phone_number: '8094701332',
    };

    try {
      const response = await client.users.updateUserData(
        userData?.id,
        dataToUpdate,
      );
      Alert.alert('Success', 'Profile updated successfully');
      setIsLoading(false);
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Error', 'An error occurred while updating your profile');
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <ScreenHeader title="Edit Profile" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => updateUserProfile(values, actions)}>
        {props => (
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 50}}>
            <Content>
              <Input
                labelText="Email"
                placeholderText="Enter your email"
                onChangeText={props.handleChange('email')}
                editable={false}
                error={props.errors.email}
                inputValue={props.values.email}
                inputProps={{
                  keyboardType: 'email-address',
                  autoCapitalize: 'none',
                  value: props.values.email,
                  defaultValue: props.values.email,
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
                  defaultValue: props.values.firstname,
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
                  defaultValue: props.values.lastname,
                }}
              />

              <Input
                labelText="Displayname"
                placeholderText="Enter your displayname"
                onChangeText={props.handleChange('displayname')}
                error={props.errors.displayname}
                editable={false}
                inputProps={{
                  autoCapitalize: 'none',
                  value: props.values.displayname,
                  defaultValue: props.values.displayname,
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

      <LoadingModal visible={isLoading} title="Saving changes..." />
    </Container>
  );
};
