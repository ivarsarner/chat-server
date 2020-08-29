import socket from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { validateUserName } from './middlewares/socket';

import { HttpServer } from './types';

import {
  addNewUser,
  connectedUsers,
  removeUser,
  socketBroadcast,
  socketDisconnect,
  startInactivityTimer,
  removeInactivityTimer,
  restartInactivityTimer,
} from './services/socket';

export const initSocketIoServer = (server: HttpServer): void => {
  const io = socket(server);

  io.use(validateUserName);

  io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    const id = socket.id;
    const userName = socket.handshake.query.userName;

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
      socketBroadcast(socket, 'typing', message);
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
      socketBroadcast(socket, 'user_disconnected', message);
      console.log(`${userName} disconnected`);
    });
  });
};
