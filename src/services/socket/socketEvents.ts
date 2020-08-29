import { Socket } from '../../types';

export const socketDisconnect = (socket: Socket): void => {
  socket.disconnect(true);
};
export const socketBroadcast = (socket: Socket, type: string, message: string): void => {
  socket.broadcast.emit(type, message);
};
