import express from 'express';
import http from 'http';
import socket from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const server = http.createServer(app);
const io = socket(server);

const port = process.env.PORT || 8080;

interface User {
  id: string;
  userName: string;
  timeConnected: number;
}

interface Message {
  author: string;
  message: string;
  id: string;
  timestamp: number;
}

const connectedUsers: User[] = [];

const isUserNameTaken = (newUserName: string) =>
  connectedUsers.some((user) => user.userName.toLowerCase() === newUserName.toLowerCase());

const getUser = (id: string) => connectedUsers.find((user) => user.id === id);

io.use((socket, next) => {
  const { userName } = socket.handshake.query;
  const timeConnected = socket.handshake.issued;

  const { id } = socket;

  if (isUserNameTaken(userName)) {
    return next(new Error('User name taken'));
  }

  const newUser = {
    id,
    userName,
    timeConnected,
  };
  connectedUsers.push(newUser);

  next();
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  const user = getUser(socket.id);

  socket.on('message', (message) => {
    const author = user?.userName;
    const timestamp = Date.now();
    console.log(timestamp);
    const newMessage = {
      author,
      message,
      timestamp,
      id: uuidv4(),
    };
    io.emit('message', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('someone disconnected');
  });
});

server.listen(port, () => {
  console.log(`Socket IO server listening on ${port}`);
});
