import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),

  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /[A-ZА-Яa-zа-я]/,
      'Password strength: must have at least one letter'
    )
    .matches(/[0-9]/, 'Password strength: must have at least one digit')
    .matches(
      /[^A-ZА-Яa-zа-я0-9Ёё\s]/,
      'Password must contain at least one special character (e.g., !@#$%^&*)'
    ),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Confirm Password does not match'),
});

export default validationSchema;
