import { isUserNameTaken } from '../../services/socket';
import { Socket, Next } from '../../types';

export const validateUserName = (socket: Socket, next: Next) => {
  const userName = socket.handshake.query.userName;

  if (isUserNameTaken(userName)) {
    return next(new Error('User name taken'));
  }

  next();
};
