import socket from 'socket.io';
import { validateUserName } from './middlewares/socket';

import { HttpServer } from './types';

import {
  storeUser,
  removeUser,
  socketBroadcast,
  socketDisconnect,
  startInactivityTimer,
  removeInactivityTimer,
  restartInactivityTimer,
  newMessage,
  getAllUsers,
  storeTypingUser,
  typingUsers,
} from './services/socket';

export const initSocketIoServer = (server: HttpServer): void => {
  const io = socket(server);

  io.use(validateUserName);

  io.on('connection', (socket) => {
    const id = socket.id;
    const userName = socket.handshake.query.userName;

    console.log('a user connected: ', userName, id);
    storeUser({ id, userName });

    socket.broadcast.emit('message', newMessage(`${userName} has connected`, 'ServerBot'));
    socket.emit('connected_users', getAllUsers());

    //startInactivityTimer();

    socket.on('message', (message) => {
      io.emit('message', newMessage(message, userName));
    });

    socket.on('typing', () => {
      storeTypingUser({ id, userName });
      socket.broadcast.emit('typing', typingUsers);
    });

    socket.on('disconnect', () => {
      removeInactivityTimer();
      removeUser(id);
      socket.emit('connected_users', getAllUsers());
      socket.broadcast.emit('message', newMessage(`${userName} has diconnected`, 'ServerBot'));

      console.log(`${userName} disconnected`);
    });
  });
};
