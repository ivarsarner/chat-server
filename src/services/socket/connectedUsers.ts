import { User, Timer, Fn, Socket } from '../../types';

export let connectedUsers: User[] = [{ id: 'x', userName: 'Ivar' }];
export let typingUsers: User[];

export const isUserNameTaken = (userName: string): boolean =>
  connectedUsers.some((user) => user.userName.toLowerCase() === userName.toLowerCase());

export const getUser = (id: string): User | undefined =>
  connectedUsers.find((user) => user.id === id);

export const getAllUsers = (): User[] => connectedUsers;

export const storeUser = (user: User): void => {
  connectedUsers.push(user);
};

export const removeUser = (id: string): void => {
  connectedUsers = connectedUsers.filter((user) => user.id !== id);
};

export const storeTypingUser = (user: User): void => {
  typingUsers.push(user);
};

export const removeTypingUser = (id: string): void => {
  typingUsers = typingUsers.filter((user) => user.id !== id);
};
