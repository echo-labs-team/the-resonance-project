import { LayoutAnimation } from 'react-native';

const animationConfig = {
  create: { duration: 150, property: 'opacity', type: 'easeOut' },
  delete: { duration: 150, property: 'opacity', type: 'easeOut' },
  update: { duration: 300, springDamping: 0.7, type: 'spring' },
};

/**
 * Validate email
 */
function validateEmail(value) {
  if (!value) {
    return 'Required';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
    return 'Invalid email address';
  }
}

/**
 * Validate the Sign Up for a group form
 */
export function validateSignUpForm(values) {
  // 💫 animate the error in/out
  LayoutAnimation.configureNext(animationConfig);

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
  LayoutAnimation.configureNext(animationConfig);

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
