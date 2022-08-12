import runMiddleware from 'middlewares/runMiddleware';
import multer from 'multer';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

// /home/node/storage
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      const randomName = Math.floor(Math.random() * 99999999);
      cb(null, `${randomName + Date.now()}.${file.mimetype.split('/')[1]}`);
    },
  }),
});

const handlePost: NextApiHandler = async (req, res) => {
  res.status(200).json({ message: req.body });
};

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (_err, _req, res) => {
    res.status(500).end('Something broke!');
  },
  onNoMatch: (_req, res) => {
    res.status(404).end('Page is not found');
  },
})
  .use((_req, _res, next) => {
    if (_req.method === 'POST') {
      runMiddleware(_req, _res, upload.single('file'));
    }
    return next();
  })
  .post(handlePost);

handler.get((req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

export default handler;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
