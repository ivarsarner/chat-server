import { User, Timer, Fn, Socket } from '../types';

export let connectedUsers: User[] = [];

export const isUserNameTaken = (userName: string) =>
  connectedUsers.some((user) => user.userName.toLowerCase() === userName.toLowerCase());

export const getUser = (id: string): User | undefined =>
  connectedUsers.find((user) => user.id === id);

export const addNewUser = (newUser: User) => connectedUsers.push(newUser);

export const removeUser = (id: string) =>
  (connectedUsers = connectedUsers.filter((user) => user.id !== id));
