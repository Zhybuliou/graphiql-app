import * as Yup from 'yup';

const passwordValidation = Yup.string()
  .required('errorValidationPasswordRequired')
  .matches(
    /^[a-zA-Z0-9!@#$%^&*\p{L}\p{N}\p{S}\p{P}]*$/u,
    'errorValidationPasswordValidSetOfCharacters'
  )
  .matches(/[A-Z]/, 'errorValidationPasswordUpperCaseLetter')
  .matches(/[a-z]/, 'errorValidationPasswordLowerCaseLetter')
  .matches(/[0-9]/, 'errorValidationPasswordDigit')
  .matches(/[!@#$%^&*]/, 'errorValidationPasswordSpecialChar')
  .matches(/^\S*$/, 'errorValidationPasswordWhitespace')
  .min(8, 'errorValidationPasswordSize');

const emailValidation = Yup.string()
  .required('errorValidationEmailRequired')
  .email('errorValidationEmailInvalid')
  .matches(
    /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
    'errorValidationEmailInvalidOrDomain'
  )
  .matches(
    /^[\w!#$%&'*+\-/=?^_`{|}~]+(?:\.[\w!#$%&'*+\-/=?^_`{|}~]+)*@[\w-]+(?:\.[\w-]+)*(?:\.[a-zA-Z]{2,})?$/,
    'errorValidationEmailInvalidLocalToggle'
  );

const nameValidation = Yup.string()
  .required('errorValidationNameRequired')
  .min(2, 'errorValidationName2Characters');

const signUpValidationSchema = Yup.object({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: Yup.string()
    .required('errorValidationConfirmPasswordRequired')
    .oneOf([Yup.ref('password')], 'errorValidationConfirmPasswordDoestMatch'),
});

const signInValidationSchema = Yup.object({
  email: emailValidation,
  password: Yup.string().required(),
});

export { signUpValidationSchema, signInValidationSchema };
