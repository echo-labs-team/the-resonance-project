import React, { useReducer, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import logEvent from '../utils/logEvent';
import Colors from '../constants/Colors';
import { Title, Subtitle } from './shared/Typography';
import Button from './shared/Button';
import { validateSignUpForm } from '../utils/formValidation';
import { joinGroup } from '../queries/groups';
import ModalSheet from './ModalSheet';
import Spinner from './shared/Spinner';
import Input from './shared/TextInput';

const initialState = {
  error: false,
  loading: false,
  success: false,
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
    case 'setError':
      return {
        ...state,
        error: action.value,
      };
    default:
      throw new Error();
  }
}

export default function JoinGroupModal({ groupID, showSuccess, title }) {
  const [{ error, loading, success }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);

  const handleOpenModal = () => {
    logEvent('OPEN Group Sign Up', {
      group: title,
    });
  };

  const handleSignUp = async ({ email, firstName, lastName }) => {
    dispatch({ type: 'setLoading', value: true });
    logEvent('SUBMIT Group Sign Up', { group: title });

    try {
      const { data } = await joinGroup(groupID, firstName, lastName, email);

      dispatch({ type: 'setLoading', value: false });

      if (data.Success) {
        // close this modal
        dispatch({ type: 'setSuccess', value: true });
        setTimeout(() => dispatch({ type: 'setSuccess', value: false }), 0);
        showSuccess('☺️ Thanks for joining!');
        logEvent('SUCCESS Group Sign Up', {
          group: title,
          message: data.Message,
        });
        return;
      }

      dispatch({ type: 'setLoading', value: false });
      dispatch({ type: 'setError', value: true });
      logEvent('ERROR Group Sign Up', { error: data.Message, group: title });
      setTimeout(() => dispatch({ type: 'setError', value: false }), 5000);
    } catch (err) {
      dispatch({ type: 'setLoading', value: false });
      dispatch({ type: 'setError', value: true });
      logEvent('ERROR Group Sign Up', { error: err, group: title });
      setTimeout(() => dispatch({ type: 'setError', value: false }), 5000);
    }
  };

  return (
    <ModalSheet
      buttonTitle="Sign Up"
      handleOpenModal={handleOpenModal}
      success={success}
    >
      {loading ? <Spinner style={{ backgroundColor: 'transparent' }} /> : null}

      <View style={styles.container}>
        <Title>Sign up</Title>

        {error ? (
          <Subtitle style={{ color: Colors.red, textAlign: 'center' }}>
            {'🤔 Something went wrong...\nTry again later'}
          </Subtitle>
        ) : null}

        <Subtitle>
          {`The group leaders will reach out to you with more info once you've joined`}
        </Subtitle>

        <Formik
          initialValues={{
            email: '',
            firstName: '',
            lastName: '',
          }}
          onSubmit={handleSignUp}
          validate={validateSignUpForm}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
          }) => (
            <View>
              <Input
                autoCompleteType="name"
                blurOnSubmit={false}
                errors={errors.firstName}
                label="First Name"
                onBlur={handleBlur('firstName')}
                onChangeText={handleChange('firstName')}
                onSubmitEditing={() => lastNameRef.current.focus()}
                placeholder="Andy"
                returnKeyType="next"
                textContentType="givenName"
                touched={touched.firstName}
                value={values.firstName}
              />
              <Input
                autoCompleteType="name"
                blurOnSubmit={false}
                errors={errors.lastName}
                label="Last Name"
                onBlur={handleBlur('lastName')}
                onChangeText={handleChange('lastName')}
                onSubmitEditing={() => emailRef.current.focus()}
                placeholder="Wood"
                ref={lastNameRef}
                returnKeyType="next"
                textContentType="familyName"
                touched={touched.lastName}
                value={values.lastName}
              />
              <Input
                autoCapitalize="none"
                autoCompleteType="email"
                autoCorrect={false}
                clearButtonMode="while-editing"
                errors={errors.email}
                keyboardType="email-address"
                label="Email"
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                placeholder="andy@echo.church"
                ref={emailRef}
                textContentType="emailAddress"
                touched={touched.email}
                value={values.email}
              />

              <View style={styles.submitButton}>
                <Button onPress={handleSubmit} title="Sign Up" />
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
    flex: 1,
    paddingHorizontal: 16,
  },
  submitButton: {
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
});
