import { Button, Stack, Switch } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GetServerSideProps } from 'next';
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from 'next-auth';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import useMode from '@/hooks/useMode';

import { authOptions } from './api/auth/[...nextauth]';

const Home = () => {
  const { mode, onChangeThemeType } = useMode();

  const router = useRouter();

  const handleNavigateSignUp = () => {
    router.push('/signUp');
  };

  return (
    <Box
      sx={{
        my: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Sistema de estoque
      </Typography>

      <Stack direction="row" spacing={2}>
        <Button variant="outlined" onClick={() => signIn()}>
          Login
        </Button>
        <Button variant="contained" color="secondary" onClick={() => handleNavigateSignUp()}>
          Cadastro
        </Button>
      </Stack>

      <Switch
        color="primary"
        checked={mode === 'dark'}
        onChange={(event) => onChangeThemeType(event.target.checked ? 'dark' : 'light')}
      />
      {/* <Link href="/about" color="secondary">
          Go to the about page
        </Link> */}
    </Box>
  );
};

export default Home;

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
