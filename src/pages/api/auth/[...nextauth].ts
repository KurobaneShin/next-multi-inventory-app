import { authUser } from 'models/users';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { User } from '@/types';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (credentials && credentials.email && credentials.password) {
          const user = await authUser(credentials.email, credentials.password);

          if (user) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
            };
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user as User;
      }
      return session;
    },
  },
  pages: {
    signIn: '/signIn',
  },
};

export default NextAuth(authOptions);
