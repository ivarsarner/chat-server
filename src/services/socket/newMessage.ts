import { v4 as uuidv4 } from 'uuid';
import { Message } from '../../types';

export const newMessage = (message: string, userName: string): Message => {
  const timestamp = Date.now();
  return {
    userName,
    message,
    timestamp,
    id: uuidv4(),
  };
};
