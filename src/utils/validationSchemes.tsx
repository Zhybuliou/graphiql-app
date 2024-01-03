import * as Yup from 'yup';

const passwordValidation = Yup.string()
  .required('Password is required')
  .matches(
    /^[a-zA-Z0-9!@#$%^&*\p{L}\p{N}\p{S}\p{P}]*$/u,
    'Password must only contain Latin symbols, digits, special characters adnd unicode symbols'
  )
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[0-9]/, 'Password must contain at least one digit')
  .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
  .matches(/^\S*$/, 'Password must not contain whitespace')
  .min(8, 'Must be at least 8 characters');

const emailValidation = Yup.string()
  .required('Email is required')
  .email('Invalid email address')
  .matches(
    /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
    'Invalid email format or missing domain'
  )
  .matches(
    /^[\w!#$%&'*+\-/=?^_`{|}~]+(?:\.[\w!#$%&'*+\-/=?^_`{|}~]+)*@[\w-]+(?:\.[\w-]+)*(?:\.[a-zA-Z]{2,})?$/,
    'Invalid localToggle-part format'
  );

const nameValidation = Yup.string()
  .required('Name is required')
  .min(2, 'Name must be at least 2 characters');

const signUpValidationSchema = Yup.object({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Confirm Password does not match'),
});

const signInValidationSchema = Yup.object({
  email: emailValidation,
  password: Yup.string().required(),
});

export { signUpValidationSchema, signInValidationSchema };
