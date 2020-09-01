import express from 'express';
import http from 'http';

import { initSocketIoServer } from './socket';

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 8080;

// sets the inactivity timer to 5 minues (300000)
const timerMs = 300000;

server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});

initSocketIoServer(server, timerMs);
