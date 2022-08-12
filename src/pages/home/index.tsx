import React from 'react';

import { Button, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from 'next-auth';
import { signOut } from 'next-auth/react';

import MainLayout from '@/layouts/MainLayout';

import { authOptions } from '../api/auth/[...nextauth]';

function Home() {
  return (
    <MainLayout>
      <Typography variant="h4">home</Typography>
      <Button variant="contained" color="error" onClick={() => signOut()}>
        Log out
      </Button>
    </MainLayout>
  );
}

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
};
