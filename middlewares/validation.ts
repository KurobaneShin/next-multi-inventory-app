import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import { OptionalObjectSchema } from 'yup/lib/object';

import response from '@/utils/response';

export default async function validation(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler,
  schema: OptionalObjectSchema<any>
) {
  try {
    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error: error is unknown type
    return res.status(400).json(response('', null, error.errors));
  }
}

// createInventoryItemSchema
