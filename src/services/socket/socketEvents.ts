import { v4 as uuidv4 } from 'uuid';
import { Socket, Io } from '../../types';

export const socketDisconnect = (socket: Socket): void => {
  socket.disconnect(true);
};
export const socketBroadcast = (socket: Socket, type: string, message: string): void => {
  socket.broadcast.emit(type, message);
};

export const newMessage = (message: string, userName: string) => {
  const timestamp = Date.now();
  return {
    userName,
    message,
    timestamp,
    id: uuidv4(),
  };
};
