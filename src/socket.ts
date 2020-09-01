import socket from 'socket.io';
import { validateUserName } from './middlewares/socket';

import { logger } from './logger';
import { HttpServer } from './types';
import {
  storeUser,
  removeUser,
  newMessage,
  getAllUsers,
  storeTypingUser,
  typingUsers,
  removeTypingUser,
} from './services/socket';

export const initSocketIoServer = (server: HttpServer): void => {
  const io = socket(server);

  logger.info('Socket IO Server initiated');

  const terminateGracefully = (signal: string) => {
    logger.warn(`${signal} occured, terminating server`);
    io.emit('server_terminated');
    io.close();
  };

  process.on('SIGINT', terminateGracefully);
  process.on('SIGTERM', terminateGracefully);

  io.use(validateUserName);

  io.on('connection', (socket) => {
    const { id } = socket;
    const { userName } = socket.handshake.query;

    let inactivityTimer: NodeJS.Timeout;

    // sets the inactivity timer to 5 minues (300000)
    const startInactivityTimer = (timeMs = 300000): void => {
      inactivityTimer = setTimeout(() => {
        socket.disconnect(true);
      }, timeMs);
    };

    startInactivityTimer();

    logger.info(`user CONNECTED: ${userName} ${id}`);

    storeUser({ id, userName });

    socket.broadcast.emit('message', newMessage(`${userName} has connected`, 'SERVER'));
    io.emit('connected_users', getAllUsers());
    socket.emit('message', newMessage(`Welcome ${userName}`, 'SERVER'));

    socket.on('message', (message) => {
      clearTimeout(inactivityTimer);
      startInactivityTimer();
      logger.info(`new message - ${userName}: ${message}`);
      io.emit('message', newMessage(message, userName));
    });

    socket.on('typing', () => {
      clearTimeout(inactivityTimer);
      startInactivityTimer();
      storeTypingUser({ id, userName });
      socket.emit('typing', typingUsers);
    });

    socket.on('stopped_typing', () => {
      removeTypingUser(id);
      clearTimeout(inactivityTimer);
      startInactivityTimer();
      socket.emit('typing', typingUsers);
    });

    socket.on('disconnect', (reason) => {
      if (reason === 'client namespace disconnect') {
        logger.info(`user left the chat: ${userName} ${id}`);
        socket.broadcast.emit('message', newMessage(`${userName} has left the chat`, 'SERVER'));
      }
      if (reason === 'server namespace disconnect') {
        logger.info(`user kicked due to inactivity: ${userName} ${id}`);
        socket.broadcast.emit(
          'message',
          newMessage(`${userName} got kicked due to inactivity`, 'SERVER')
        );
      }
      clearTimeout(inactivityTimer);
      removeUser(id);
      removeTypingUser(id);
      io.emit('connected_users', getAllUsers());
      console.log(`${userName} disconnected`);
    });
  });
};
