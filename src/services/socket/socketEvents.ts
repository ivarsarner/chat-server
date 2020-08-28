import { Socket } from '../../types';

export const socketDisconnect = (socket: Socket) => socket.disconnect(true);
export const socketBroadcast = (socket: Socket, message: string) =>
  socket.broadcast.emit('broadcast', message);
