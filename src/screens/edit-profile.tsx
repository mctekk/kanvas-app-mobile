/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
// Modules
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert } from 'react-native';

// Molecules
import Header from 'components/molecules/header';
import TextInput from 'components/molecules/text-input';
import LoadingModal from 'components/molecules/modals/loading-modal';

// Styles
import { Colors } from 'styles';

// Atoms
import CustomButton from 'components/atoms/button';
import { TextTransform, translate } from 'components/atoms/localized-label';

// Api
import { client } from 'core/kanvas_client';

// Context
import { AuthContext } from 'components/context/auth-context';
import { UserContext } from 'components/context/user-context';

// Styles
import { DEFAULT_THEME } from 'styles/theme';

// Interfaces
interface IEditProfileProps {
  navigation: any;
}

const Container = styled.View`
  flex: 1;
  background-color: ${DEFAULT_THEME.background};
`;

const ScreenHeader = styled(Header)`
  justify-content: space-between;
  align-items: center;
  background-color: ${DEFAULT_THEME.primary};
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
  email: yup.string().required(translate('fieldRequired', TextTransform.NONE)),
  firstname: yup.string().required(translate('fieldRequired', TextTransform.NONE)),
  lastname: yup.string().required(translate('fieldRequired', TextTransform.NONE)),
  displayname: yup.string().required(translate('fieldRequired', TextTransform.NONE)),
});

export const EditProfile = (props: IEditProfileProps) => {
  // States
  const [isLoading, setIsLoading] = useState(false);

  // Context
  const { updateUserData } = useContext(AuthContext);
  const { userData } = useContext(UserContext);

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
      console.log('Update User Data Response:', response);
      updateUserData(response);
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
      <ScreenHeader
        title={translate('editProfile', TextTransform.CAPITALIZE)}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => updateUserProfile(values, actions)}>
        {props => (
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50 }}>
            <Content>
              <Input
                labelText={translate('email', TextTransform.CAPITALIZE)}
                placeholderText={translate('placeholderMail', TextTransform.CAPITALIZE)}
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
                labelText={translate('firstName', TextTransform.CAPITALIZE)}
                placeholderText={translate('placeholderFirstName', TextTransform.CAPITALIZE)}
                onChangeText={props.handleChange('firstname')}
                error={props.errors.firstname}
                inputProps={{
                  autoCapitalize: 'none',
                  value: props.values.firstname,
                  defaultValue: props.values.firstname,
                }}
              />

              <Input
                labelText={translate('lastName', TextTransform.CAPITALIZE)}
                placeholderText={translate('placeholderLastName', TextTransform.CAPITALIZE)}
                onChangeText={props.handleChange('lastname')}
                error={props.errors.lastname}
                inputProps={{
                  autoCapitalize: 'none',
                  value: props.values.lastname,
                  defaultValue: props.values.lastname,
                }}
              />

              <Input
                labelText={translate('displayName', TextTransform.CAPITALIZE)}
                placeholderText={translate('placeholderDisplayName', TextTransform.CAPITALIZE)}
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
                title={translate('saveChanges', TextTransform.CAPITALIZE)}
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
