import express, { NextFunction, Response, Request } from 'express';
import http from 'http';
import cors from 'cors';

import { initSocketIoServer } from './socket';
import { logger } from './logger';

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 8080;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Socket IO server is online');
});

server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(req.url);
  logger.error(err.message, err);
  res.status(400).json({
    error: err.message,
  });
  next();
});

initSocketIoServer(server);
