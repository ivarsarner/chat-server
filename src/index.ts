import express from 'express';
import http from 'http';

import { initSocketIoServer } from './socket';

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`Socket IO server listening on ${port}`);
});

initSocketIoServer(server);
