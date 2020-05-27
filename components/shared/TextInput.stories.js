/* eslint-disable no-console, react-native/no-inline-styles */
import React, { useState } from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { Formik } from 'formik';
import CenterView from '../../storybook/CenterView';
import { validateSignUpForm } from '../../utils/formValidation';
import TextInput from './TextInput';
import Button from './Button';

function Input(props) {
  const [value, setValue] = useState('');

  return (
    <TextInput
      value={value}
      onChangeText={(newValue) => setValue(newValue)}
      {...props}
    />
  );
}

storiesOf('Text Input', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => (
    <View style={{ width: '100%', paddingHorizontal: 10 }}>
      <Input autoCompleteType="name" label="First Name" placeholder="Andy" />
    </View>
  ))
  .add('with multiple inputs', () => (
    <View style={{ width: '100%', paddingHorizontal: 10 }}>
      <Input autoCompleteType="name" label="First Name" placeholder="Andy" />
      <Input autoCompleteType="name" label="Last Name" placeholder="Wood" />
      <Input
        autoCapitalize="none"
        autoCompleteType="email"
        label="Email"
        placeholder="andy@echo.church"
      />
    </View>
  ))
  .add('Sign Up form with Formik', () => (
    <Formik
      initialValues={{ firstName: '', email: '' }}
      validate={validateSignUpForm}
      onSubmit={(values) =>
        console.log('form data:', JSON.stringify(values, null, 2))
      }
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        values,
        errors,
      }) => (
        <View style={{ width: '100%', paddingHorizontal: 10 }}>
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
          <Button
            title="Submit"
            style={{ marginTop: 16 }}
            onPress={handleSubmit}
          />
        </View>
      )}
    </Formik>
  ));
