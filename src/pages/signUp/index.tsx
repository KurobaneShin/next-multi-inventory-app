import { Box, Button, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import { signUpSchema } from '@/schemas/auth';
import { useSingUp } from '@/services/auth/hooks';

import AuthLayout from '../../layouts/AuthLayout';

function SignUp() {
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();
  const { mutate } = useSingUp();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          enqueueSnackbar('Successfully signed up', { variant: 'success' });
          router.push('/');
        },
        onError: (error) => {
          console.log(error);
          enqueueSnackbar('algo deu errado', { variant: 'error' });
        },
      });
    },
  });

  const nameError = formik.touched.name && formik.errors.name;
  const emailError = formik.touched.email && formik.errors.email;
  const passwordError = formik.touched.password && formik.errors.password;
  const confirmPasswordError = formik.touched.confirmPassword && formik.errors.confirmPassword;

  return (
    <AuthLayout title="Cadastro" subtitle="Crie uma conta para usar o estoque">
      <Box sx={{ width: 400 }} component="form" onSubmit={formik.handleSubmit} autoComplete="" noValidate>
        <Stack spacing={3} sx={{ minWidth: 300 }}>
          <TextField
            label="Nome"
            placeholder="Nome"
            fullWidth
            name="name"
            error={Boolean(nameError)}
            helperText={nameError}
            onChange={formik.handleChange}
          />

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
              autoComplete: 'new-password',
            }}
          />

          <TextField
            label="Confirme a senha"
            placeholder="Confirme a senha"
            name="confirmPassword"
            type="password"
            error={Boolean(confirmPasswordError)}
            helperText={confirmPasswordError}
            onChange={formik.handleChange}
            inputProps={{
              autoComplete: 'new-password',
            }}
          />

          <Button fullWidth variant="contained" type="submit">
            Cadastrar
          </Button>
        </Stack>
      </Box>
    </AuthLayout>
  );
}

export default SignUp;
