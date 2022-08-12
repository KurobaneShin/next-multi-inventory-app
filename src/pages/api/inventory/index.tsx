import { createInventory } from 'models/inventory';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (_err, _req, res) => {
    res.status(500).end('Something broke!');
  },
  onNoMatch: (_req, res) => {
    res.status(404).end('Page is not found');
  },
});

handler.post(async (req, res) => {
  const { userId, name } = await req.body;
  const inventory = await createInventory({ userId, name });
  if (!inventory) {
    res.status(500).end('Erro!');
  } else {
    res.status(200).json(inventory);
  }
});

export default handler;
