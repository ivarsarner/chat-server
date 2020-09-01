import { v4 as uuidv4 } from 'uuid';

export const newMessage = (message: string, userName: string) => {
  const timestamp = Date.now();
  return {
    userName,
    message,
    timestamp,
    id: uuidv4(),
  };
};
