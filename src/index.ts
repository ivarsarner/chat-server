import express from 'express';
import http from 'http';

import { initSocketIoServer } from './socket';

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Socket IO server is online');
});

server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});

initSocketIoServer(server);
