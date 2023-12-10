import * as Yup from 'yup';

const passwordValidation = Yup.string()
  .required('Password is required')
  .matches(/[A-ZА-Яa-zа-я]/, 'Must have at least one letter')
  .matches(/[0-9]/, 'Must have at least one digit')
  .matches(
    /[^A-ZА-Яa-zа-я0-9Ёё\s]/,
    'Must contain at least one special character'
  )
  .min(8, 'Must be at least 8 characters');

const emailValidation = Yup.string()
  .email('Invalid email address')
  .required('Email is required')
  .matches(
    /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
    'Invalid email format or missing domain'
  )
  .matches(
    /^[\w!#$%&'*+\-/=?^_`{|}~]+(?:\.[\w!#$%&'*+\-/=?^_`{|}~]+)*@[\w-]+(?:\.[\w-]+)*(?:\.[a-zA-Z]{2,})?$/,
    'Invalid local-part format'
  );

const nameValidation = Yup.string()
  .required('Name is required')
  .min(2, 'Name must be at least 2 characters');

const signUpValidationSchemes = Yup.object({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Confirm Password does not match'),
});

const signInValidationSchemes = Yup.object({
  email: emailValidation,
  password: passwordValidation,
});

export { signUpValidationSchemes, signInValidationSchemes };
