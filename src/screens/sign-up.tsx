// Modules
import React from 'react';
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
  const handleRegistration = (values: any, actions: any) => {
    console.log('values', values);
    console.log('actions', actions);
  };

  return (
    <Container>
      <ScreenHeader title="Sign Up" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => handleRegistration(values, actions)}>
        {props => (
          <KeyboardAwareScrollView>
            <Content>
              <Input
                labelText="Email"
                placeholderText="Enter your email"
                onChangeText={props.handleChange('email')}
                value={props.values.email}
                error={props.errors.email}
              />

              <Input
                labelText="Firstname"
                placeholderText="Enter your firstname"
                onChangeText={props.handleChange('firstname')}
                value={props.values.firstname}
                error={props.errors.firstname}
              />

              <Input
                labelText="Lastname"
                placeholderText="Enter your lastname"
                onChangeText={props.handleChange('lastname')}
                value={props.values.lastname}
                error={props.errors.lastname}
              />

              <Input
                labelText="Displayname"
                placeholderText="Enter your displayname"
                onChangeText={props.handleChange('displayname')}
                value={props.values.displayname}
                error={props.errors.displayname}
              />

              <Input
                labelText="Password"
                placeholderText="Enter your password"
                onChangeText={props.handleChange('password')}
                value={props.values.password}
                error={props.errors.password}
                secureTextEntry={true}
              />

              <Input
                labelText="Confirm Password"
                placeholderText="Confirm your password"
                onChangeText={props.handleChange('password_confirmation')}
                value={props.values.password_confirmation}
                error={props.errors.password_confirmation}
                secureTextEntry={true}
              />

              <Button title="Sign Up" onPress={props.handleSubmit} />
            </Content>
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </Container>
  );
};
