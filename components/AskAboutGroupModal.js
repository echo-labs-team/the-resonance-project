import React, { useReducer } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Amplitude from 'expo-analytics-amplitude';
import { Formik } from 'formik';
import { Title, Subtitle } from './shared/Typography';
import Button from './shared/Button';
import { validateAskQuestionForm } from '../utils/formValidation';
import { askQuestion } from '../data/groups';
import ModalSheet from './ModalSheet';
import Spinner from './shared/Spinner';
import Input from './shared/TextInput';

const initialState = {
  loading: false,
  success: false,
  firstName: '',
  lastName: '',
  email: '',
  question: '',
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

export default function AskAboutGroupModal({ groupID, title, showSuccess }) {
  const [{ loading, success }, dispatch] = useReducer(reducer, initialState);

  const handleOpenModal = () => {
    Amplitude.logEventWithProperties('OPEN Group Ask Question', {
      group: title,
    });
  };

  const handleAsk = ({ firstName, lastName, email, question }) => {
    dispatch({ type: 'setLoading', value: true });
    Amplitude.logEventWithProperties('SUBMIT Group Ask Question', {
      group: title,
    });
    askQuestion(groupID, firstName, lastName, email, question)
      .then((askSuccess) => {
        if (askSuccess) {
          // close this modal
          dispatch({ type: 'setLoading', value: false });
          dispatch({ type: 'setSuccess', value: true });
          setTimeout(() => dispatch({ type: 'setSuccess', value: false }), 0);

          showSuccess('Thanks for asking ☺️');
        }
      })
      .catch((err) => {
        dispatch({ type: 'setLoading', value: false });
        Amplitude.logEventWithProperties('ERROR Group Ask Question', {
          group: title,
          error: err,
        });
      });
  };

  return (
    <ModalSheet
      buttonTitle="Ask a Question"
      success={success}
      handleOpenModal={handleOpenModal}
    >
      {loading && <Spinner style={{ backgroundColor: 'transparent' }} />}

      <View style={styles.container}>
        <Title>Ask a question</Title>

        <Subtitle>
          {`The group leaders will reach out to you with more info about this group`}
        </Subtitle>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            question: '',
          }}
          validate={validateAskQuestionForm}
          onSubmit={handleAsk}
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
              <Input
                label="Question"
                placeholder="Ask a question..."
                touched={touched.question}
                value={values.question}
                errors={errors.question}
                onChangeText={handleChange('question')}
                onBlur={handleBlur('question')}
              />

              <View style={styles.submitButton}>
                <Button title="Ask" onPress={handleSubmit} />
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
