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
  loading: false,
  success: false,
  error: false,
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

export default function JoinGroupModal({ groupID, title, showSuccess }) {
  const [{ loading, success, error }, dispatch] = useReducer(
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

  const handleSignUp = async ({ firstName, lastName, email }) => {
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
      logEvent('ERROR Group Sign Up', { group: title, error: data.Message });
      setTimeout(() => dispatch({ type: 'setError', value: false }), 5000);
    } catch (err) {
      dispatch({ type: 'setLoading', value: false });
      dispatch({ type: 'setError', value: true });
      logEvent('ERROR Group Sign Up', { group: title, error: err });
      setTimeout(() => dispatch({ type: 'setError', value: false }), 5000);
    }
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

        {error && (
          <Subtitle style={{ textAlign: 'center', color: Colors.red }}>
            {'🤔 Something went wrong...\nTry again later'}
          </Subtitle>
        )}

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
                blurOnSubmit={false}
                label="First Name"
                placeholder="Andy"
                returnKeyType="next"
                textContentType="givenName"
                touched={touched.firstName}
                value={values.firstName}
                errors={errors.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                onSubmitEditing={() => lastNameRef.current.focus()}
              />
              <Input
                autoCompleteType="name"
                blurOnSubmit={false}
                label="Last Name"
                placeholder="Wood"
                ref={lastNameRef}
                returnKeyType="next"
                textContentType="familyName"
                touched={touched.lastName}
                value={values.lastName}
                errors={errors.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                onSubmitEditing={() => emailRef.current.focus()}
              />
              <Input
                autoCapitalize="none"
                autoCompleteType="email"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                label="Email"
                placeholder="andy@echo.church"
                ref={emailRef}
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
