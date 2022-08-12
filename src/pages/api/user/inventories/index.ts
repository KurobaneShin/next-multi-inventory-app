import { getInventoriesFromUser } from 'models/inventory';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import response from '@/utils/response';

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (_err, _req, res) => {
    res.status(500).end('Something broke!');
  },
  onNoMatch: (_req, res) => {
    res.status(404).end('Page is not found');
  },
});

handler.get(async (req, res) => {
  const { userId } = req.query;

  if (!userId) res.status(404).json(response('Usuário não encontrado', null));

  const inventories = await getInventoriesFromUser(userId as string);

  if (!inventories) res.status(404).json(response('Inventário não encontrado', null));

  res.status(200).json(response('sucesso', inventories));
});

export default handler;
