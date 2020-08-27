import express from 'express';
import http from 'http'
import socket from 'socket.io'

const app = express();
const server = http.createServer(app);
const io = socket(server);

const port = process.env.PORT || 8080

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
});

server.listen(port, () => {
  console.log(`Socket IO server listening on ${port}`);
});