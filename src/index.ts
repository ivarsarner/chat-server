import express from 'express';
import http from 'http';
import socket from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

import { User, Timer, Fn, Socket } from './types/types';

import { isUserNameTaken, addNewUser, connectedUsers, removeUser } from './lib';
import { startTimer, removeTimer, restartTimer } from './timer';

const app = express();
const server = http.createServer(app);
const io = socket(server);

const port = process.env.PORT || 8080;

let id: string;
let userName: string;

io.use((socket, next) => {
  id = socket.id;
  userName = socket.handshake.query.userName;

  if (isUserNameTaken(userName)) {
    return next(new Error('User name taken'));
  }

  const newUser = { id, userName };
  addNewUser(newUser);
  next();
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  const socketDisconnect = () => socket.disconnect(true);
  const socketBroadcast = (message: string) => socket.broadcast.emit('broadcast', message);

  let inactivityTimer: Timer;
  const startInactivityTimer = () => startTimer(inactivityTimer, socketDisconnect, 10000);
  const removeInactivityTimer = () => removeTimer(inactivityTimer);
  const restartInactivityTimer = () => restartTimer(inactivityTimer, socketDisconnect, 10000);

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
    socketBroadcast(`${userName} is typing...`);
  });

  socket.on('get_users', () => {
    socket.emit('get_users', connectedUsers);
  });

  socket.on('manual_disconnect', () => {
    socketDisconnect();
  });

  socket.on('disconnect', () => {
    removeInactivityTimer();
    removeUser(id);
    socketBroadcast(`${userName} disconnected`);
    console.log(`${userName} disconnected`);
  });
});

server.listen(port, () => {
  console.log(`Socket IO server listening on ${port}`);
});
