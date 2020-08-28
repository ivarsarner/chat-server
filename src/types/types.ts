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

export type Timer = NodeJS.Timeout;
export type Socket = SocketIO.Socket;
export type Fn = () => void;
