import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  name: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas não conferem')
    .required(),
});

export const signUpRequestSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  name: yup.string().required(),
});

export const signInSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});
