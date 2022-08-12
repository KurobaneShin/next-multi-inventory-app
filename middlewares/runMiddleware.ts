import { NextApiRequest, NextApiResponse } from 'next';

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: (...args: any[]) => void) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default runMiddleware;
