/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from 'http';

export type HttpServer = Server;
export type Socket = SocketIO.Socket;
export type Io = SocketIO.Server;
export type Next = (err?: any) => void;

export type Timer = NodeJS.Timeout;
export type Fn = (par?: any) => void;

export interface User {
  id: string;
  userName: string;
}

export interface Message {
  userName: string;
  message: string;
  id: string;
  timestamp: number;
}
