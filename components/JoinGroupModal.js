import React, { useReducer } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Amplitude from 'expo-analytics-amplitude';
import { Formik } from 'formik';
import { Title, Subtitle } from './shared/Typography';
import Button from './shared/Button';
import { validateSignUpForm } from '../utils/formValidation';
import { joinGroup } from '../data/groups';
import ModalSheet from './ModalSheet';
import Spinner from './shared/Spinner';
import Input from './shared/TextInput';

const initialState = {
  loading: false,
  success: false,
  firstName: '',
  lastName: '',
  email: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'setLoading':
      return {
        ...state,
        loading: action.value,
      };
    case 'setSuccess':
      return {
        ...state,
        success: action.value,
      };
    default:
      throw new Error();
  }
}

export default function JoinGroupModal({ groupID, title, showSuccess }) {
  const [{ loading, success }, dispatch] = useReducer(reducer, initialState);

  const handleOpenModal = () => {
    Amplitude.logEventWithProperties('OPEN Group Sign Up', {
      group: title,
    });
  };

  const handleSignUp = ({ firstName, lastName, email }) => {
    dispatch({ type: 'setLoading', value: true });
    Amplitude.logEventWithProperties('SUBMIT Group Sign Up', {
      group: title,
    });
    joinGroup(groupID, firstName, lastName, email)
      .then((joinGroupSuccess) => {
        if (joinGroupSuccess) {
          // close this modal
          dispatch({ type: 'setLoading', value: false });
          dispatch({ type: 'setSuccess', value: true });
          setTimeout(() => dispatch({ type: 'setSuccess', value: false }), 0);

          showSuccess('Thanks for joining ☺️');
        }
      })
      .catch((err) => {
        dispatch({ type: 'setLoading', value: false });
        Amplitude.logEventWithProperties('ERROR Group Sign Up', {
          group: title,
          error: err,
        });
      });
  };

  return (
    <ModalSheet
      buttonTitle="Sign Up"
      success={success}
      handleOpenModal={handleOpenModal}
    >
      {loading && <Spinner style={{ backgroundColor: 'transparent' }} />}

      <View style={styles.container}>
        <Title>Sign up</Title>

        <Subtitle>
          {`The group leaders will reach out to you with more info once you've joined`}
        </Subtitle>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
          }}
          validate={validateSignUpForm}
          onSubmit={handleSignUp}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            touched,
            values,
            errors,
          }) => (
            <View>
              <Input
                autoCompleteType="name"
                label="First Name"
                placeholder="Andy"
                textContentType="givenName"
                touched={touched.firstName}
                value={values.firstName}
                errors={errors.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
              />
              <Input
                autoCompleteType="name"
                label="Last Name"
                placeholder="Wood"
                textContentType="familyName"
                touched={touched.lastName}
                value={values.lastName}
                errors={errors.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
              />
              <Input
                autoCapitalize="none"
                autoCompleteType="email"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                label="Email"
                placeholder="andy@echo.church"
                textContentType="emailAddress"
                touched={touched.email}
                value={values.email}
                errors={errors.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />

              <View style={styles.submitButton}>
                <Button title="Sign Up" onPress={handleSubmit} />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ModalSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  submitButton: {
    flex: 1,
    marginVertical: 10,
    justifyContent: 'flex-end',
  },
});
