import express from 'express';
import http from 'http';
import socket from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

import { validateUserName } from './middlewares/socket';

import {
  isUserNameTaken,
  addNewUser,
  connectedUsers,
  removeUser,
  socketBroadcast,
  socketDisconnect,
  startInactivityTimer,
  removeInactivityTimer,
  restartInactivityTimer,
} from './services/socket';

const app = express();
const server = http.createServer(app);
const io = socket(server);

const port = process.env.PORT || 8080;

let id: string;
let userName: string;

io.use(validateUserName);

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  id = socket.id;
  userName = socket.handshake.query.userName;

  const newUser = { id, userName };
  addNewUser(newUser);

  //startInactivityTimer();

  socket.on('message', (message) => {
    const timestamp = Date.now();
    const newMessage = {
      userName,
      message,
      timestamp,
      id: uuidv4(),
    };
    io.emit('message', newMessage);
  });

  socket.on('typing', () => {
    const message = `${userName} is typing...`;
    socketBroadcast(socket, message);
  });

  socket.on('get_users', () => {
    socket.emit('get_users', connectedUsers);
  });

  socket.on('manual_disconnect', () => {
    socketDisconnect(socket);
  });

  socket.on('disconnect', () => {
    removeInactivityTimer();
    removeUser(id);
    const message = `${userName} disconnected`;
    socketBroadcast(socket, message);
    console.log(`${userName} disconnected`);
  });
});

server.listen(port, () => {
  console.log(`Socket IO server listening on ${port}`);
});
