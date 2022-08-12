import bcryptjs from 'bcryptjs';

function getNumberOfSaltRounds() {
  let saltRounds = 14;

  if (['test', 'development'].includes(process.env.NODE_ENV)) {
    saltRounds = 1;
  }

  return saltRounds;
}

export async function hash(password: string) {
  return bcryptjs.hash(password, getNumberOfSaltRounds());
}

export async function compare(providedPassword: string, storedPassword: string) {
  return bcryptjs.compareSync(providedPassword, storedPassword);
}
