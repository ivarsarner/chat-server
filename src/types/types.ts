export type Socket = SocketIO.Socket;
export type Next = (err?: any) => void;

export type Timer = NodeJS.Timeout;
export type Fn = () => void;

export interface User {
  id: string;
  userName: string;
}

export interface Message {
  author: string;
  message: string;
  id: string;
  timestamp: number;
}
