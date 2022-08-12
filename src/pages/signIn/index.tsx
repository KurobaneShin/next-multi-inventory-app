import { Box, Button, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { GetServerSideProps } from 'next';
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from 'next-auth';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import { signInSchema } from '@/schemas/auth';

import AuthLayout from '../../layouts/AuthLayout';
import { authOptions } from '../api/auth/[...nextauth]';

function SignIn() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      const request = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (request && request.ok) {
        if (router.query.callbackUrl) {
          router.push(router.query.callbackUrl as string);
        } else {
          router.push('/');
        }
      } else {
        enqueueSnackbar('Dados inválidos', { variant: 'error' });
      }
    },
  });

  const emailError = formik.touched.email && formik.errors.email;
  const passwordError = formik.touched.password && formik.errors.password;

  return (
    <AuthLayout title="Login" subtitle="Insira seus dados de acesso">
      <Box sx={{ width: 400 }} component="form" onSubmit={formik.handleSubmit} autoComplete="" noValidate>
        <Stack spacing={3} sx={{ minWidth: 300 }}>
          <TextField
            label="E-mail"
            placeholder="E-mail"
            name="email"
            error={Boolean(emailError)}
            helperText={emailError}
            onChange={formik.handleChange}
            inputProps={{
              autoComplete: 'email',
            }}
          />

          <TextField
            label="Senha"
            placeholder="Senha"
            name="password"
            type="password"
            error={Boolean(passwordError)}
            helperText={passwordError}
            onChange={formik.handleChange}
            inputProps={{
              autoComplete: 'password',
            }}
          />

          <Button fullWidth variant="contained" type="submit">
            Entrar
          </Button>
        </Stack>
      </Box>
    </AuthLayout>
  );
}

export default SignIn;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: '/home',
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
};
