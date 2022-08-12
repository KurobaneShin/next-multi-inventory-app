import { createUser } from 'models/users';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import { signUpRequestSchema } from '@/schemas/auth';
// eslint-disable-next-line import/order
import { hash } from '@/services/password';

const handlePost: NextApiHandler = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await createUser(name, email, await hash(password));

    return res.status(201).json({ message: 'Usuário criado com sucesso', user });
  } catch (error) {
    return res.status(400).json({ errors: ['Email já cadastrado'] });
  }
};

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (_err, _req, res) => {
    res.status(500).end('Something broke!');
  },
  onNoMatch: (_req, res) => {
    res.status(404).end('Page is not found');
  },
})
  .use(async (req, res, next) => {
    if (req.method === 'POST') {
      try {
        await signUpRequestSchema.validate(req.body, { abortEarly: false });
        return next();
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error: error is unknown type
        return res.status(400).json({ errors: error.errors });
      }
    }
    return next();
  })
  .post(handlePost)
  .get((_req, res) => {
    res.status(200).json({ message: 'ok' });
  });

export default handler;
