import { LayoutAnimation } from 'react-native';

/**
 * Validate email
 */
function validateEmail(value) {
  if (!value) {
    return 'Required';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Invalid email address';
  }
}

/**
 * Validate the Sign Up for a group form
 */
export function validateSignUpForm(values) {
  // 💫 animate the error in/out
  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }

  // get any email input errors
  const emailErrors = validateEmail(values.email);

  if (emailErrors) {
    errors.email = emailErrors;
  }

  return errors;
}

/**
 * Validate the Ask a Question about a group form
 */
export function validateAskQuestionForm(values) {
  // 💫 animate the error in/out
  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }

  // get any email input errors
  const emailErrors = validateEmail(values.email);

  if (emailErrors) {
    errors.email = emailErrors;
  }

  if (!values.question) {
    errors.question = 'Required';
  }

  return errors;
}
