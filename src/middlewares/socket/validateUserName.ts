import { isUserNameTaken } from '../../services/socket';
import { logger } from '../../logger';
import { Socket, Next } from '../../types';

export const validateUserName = (socket: Socket, next: Next) => {
  const userName: string = socket.handshake.query.userName;
  const regex = /\b\w{3,12}\b/i;

  if (!regex.test(userName)) {
    logger.info(`connection rejected - userName not desired length: ${userName}`);
    return next(new Error('userName_length'));
  }

  if (userName.toUpperCase() === 'SERVER') {
    logger.info('connection rejected - userName === "SERVER"');
    return next(new Error('userName_server'));
  }

  if (isUserNameTaken(userName)) {
    logger.info(`connection rejected - userName taken: ${userName}`);
    return next(new Error('userName_taken'));
  }

  next();
};
