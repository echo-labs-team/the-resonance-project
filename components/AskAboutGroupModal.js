import React, { useReducer, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import logEvent from '../utils/logEvent';
import Colors from '../constants/Colors';
import { Title, Subtitle } from './shared/Typography';
import Button from './shared/Button';
import { validateAskQuestionForm } from '../utils/formValidation';
import { askQuestion } from '../queries/groups';
import ModalSheet from './ModalSheet';
import Spinner from './shared/Spinner';
import Input from './shared/TextInput';

const initialState = {
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

export default function AskAboutGroupModal({ groupID, showSuccess, title }) {
  const [{ error, loading, success }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const questionRef = useRef(null);

  const handleOpenModal = () => {
    logEvent('OPEN Group Ask Question', {
      group: title,
    });
  };

  const handleAsk = async ({ email, firstName, lastName, question }) => {
    dispatch({ type: 'setLoading', value: true });
    logEvent('SUBMIT Group Ask Question', { group: title });

    try {
      const { data } = await askQuestion(
        groupID,
        firstName,
        lastName,
        email,
        question
      );

      dispatch({ type: 'setLoading', value: false });

      if (data.Success) {
        // close this modal
        dispatch({ type: 'setSuccess', value: true });
        setTimeout(() => dispatch({ type: 'setSuccess', value: false }), 0);
        showSuccess('Thanks for asking ☺️');
        logEvent('SUCCESS Group Ask Question', {
          group: title,
          message: data.Message,
        });
        return;
      }

      dispatch({ type: 'setLoading', value: false });
      dispatch({ type: 'setError', value: true });
      logEvent('ERROR Group Ask Question', {
        error: data.Message,
        group: title,
      });
      setTimeout(() => dispatch({ type: 'setError', value: false }), 5000);
    } catch (err) {
      dispatch({ type: 'setLoading', value: false });
      dispatch({ type: 'setError', value: true });
      logEvent('ERROR Group Ask Question', { error: err, group: title });
      setTimeout(() => dispatch({ type: 'setError', value: false }), 5000);
    }
  };

  return (
    <ModalSheet
      buttonTitle="Ask a Question"
      handleOpenModal={handleOpenModal}
      success={success}
    >
      {loading ? <Spinner style={{ backgroundColor: 'transparent' }} /> : null}

      <View style={styles.container}>
        <Title>Ask a question</Title>

        {error ? (
          <Subtitle style={{ color: Colors.red, textAlign: 'center' }}>
            {'🤔 Something went wrong...\nTry again later'}
          </Subtitle>
        ) : null}

        <Subtitle>
          The group leaders will reach out to you with more info about this
          group
        </Subtitle>

        <Formik
          initialValues={{
            email: '',
            firstName: '',
            lastName: '',
            question: '',
          }}
          onSubmit={handleAsk}
          validate={validateAskQuestionForm}
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
                blurOnSubmit={false}
                clearButtonMode="while-editing"
                errors={errors.email}
                keyboardType="email-address"
                label="Email"
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                onSubmitEditing={() => questionRef.current.focus()}
                placeholder="andy@echo.church"
                ref={emailRef}
                returnKeyType="next"
                textContentType="emailAddress"
                touched={touched.email}
                value={values.email}
              />
              <Input
                errors={errors.question}
                label="Question"
                onBlur={handleBlur('question')}
                onChangeText={handleChange('question')}
                placeholder="Ask a question..."
                ref={questionRef}
                touched={touched.question}
                value={values.question}
              />

              <View style={styles.submitButton}>
                <Button onPress={handleSubmit} title="Ask" />
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
