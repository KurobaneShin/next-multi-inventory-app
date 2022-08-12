import validation from 'middlewares/validation';
import { createInventoryItem, getInventoryItemFromInventory } from 'models/inventoryItems';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import { createInventoryItemSchema } from '@/schemas/inventoryItems';
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
  const { inventoryId } = req.query;
  const item = await getInventoryItemFromInventory(inventoryId as string);

  if (!item) res.status(404).json(response('Nenhum item encontrado', null));

  res.status(200).json(response('sucesso', item));
});

handler
  .use(async (req, res, next) => {
    validation(req, res, next, createInventoryItemSchema);
  })
  .post(async (req, res) => {
    const { inventoryId, name } = req.body;

    const item = await createInventoryItem({ inventoryId, name });

    if (!item) res.status(404).json(response('Nenhum item encontrado', null));

    res.status(200).json(response('sucesso', item));
  });

export default handler;
