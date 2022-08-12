import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return res.status(200).json({ ping: 'pong' });
    //   case "POST":
    //     return handlePost(req, res);
    default:
      return res.status(405);
  }
}
