import { compare } from '@/services/password';

import prisma from '../src/services/prisma';

export async function getAllUsers(page: number) {
  const perPage = 10;

  let offset = 0;

  if (page) {
    offset = (page - 1) * perPage;
  }

  return prisma.user.findMany({
    skip: offset,
    take: perPage,

    select: {
      id: true,
      name: true,
      email: true,
    },

    orderBy: {
      id: 'asc',
    },
  });
}

export async function authUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  return user;
}

export async function createUser(name: string, email: string, password: string) {
  return prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
}
