// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth/next';

import { User } from '.';

type authUser = User & {
  password: string;
};

declare module 'next-auth' {
  interface Session {
    user: authUser;
  }
}
