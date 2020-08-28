import express from 'express';
import http from 'http';
import socket from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const server = http.createServer(app);
const io = socket(server);

const port = process.env.PORT || 8080

const connectedUsers = [
  {id: uuidv4(), userName: 'Ivar'},
  {id: uuidv4(), userName: 'Kat'},
  {id: uuidv4(), userName: 'Seuss'},
];

const isUserNameTaken = (newUserName:string) => connectedUsers.some((user) => user.userName === newUserName)
/* 
io.use((socket, next) => {
  console.log(socket.request.query)
}) */

io.on('connection', (socket) => {
  const { userName } = socket.handshake.query; 

  if(userName) {
    console.log(userName);
    console.log(isUserNameTaken(userName));

    if (!isUserNameTaken(userName)) {
      const newUser = { id: uuidv4(), userName }
      connectedUsers.push(newUser)
      console.log(connectedUsers)
    }

  }

  // console.log(isUserNameTaken(socket))

  console.log('a user connected', socket.id);
  socket.on('MESSAGE', (data) => {
    const message = {
      author: 'böb',
      message: data,
      timestamp: 1,
      id: uuidv4()
    }
    io.emit('MESSAGE', message);
  });
});

server.listen(port, () => {
  console.log(`Socket IO server listening on ${port}`);
});