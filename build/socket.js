"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocketIoServer = void 0;
const socket_io_1 = __importDefault(require("socket.io"));
const socket_1 = require("./middlewares/socket");
const logger_1 = require("./logger");
const socket_2 = require("./services/socket");
exports.initSocketIoServer = (server) => {
    const io = socket_io_1.default(server);
    logger_1.logger.info('Socket IO Server initiated');
    const terminateGracefully = (signal) => {
        logger_1.logger.warn(`${signal} occured, terminating server`);
        io.emit('server_terminated');
        io.close();
    };
    process.on('SIGINT', terminateGracefully);
    process.on('SIGTERM', terminateGracefully);
    io.use(socket_1.validateUserName);
    io.on('connection', (socket) => {
        const { id } = socket;
        const { userName } = socket.handshake.query;
        let inactivityTimer;
        // sets the inactivity timer to 5 minues (300000)
        const startInactivityTimer = (timeMs = 300000) => {
            inactivityTimer = setTimeout(() => {
                socket.disconnect(true);
            }, timeMs);
        };
        startInactivityTimer();
        logger_1.logger.info(`user CONNECTED: ${userName} ${id}`);
        socket_2.storeUser({ id, userName });
        socket.broadcast.emit('message', socket_2.newMessage(`${userName} has connected`, 'SERVER'));
        io.emit('connected_users', socket_2.getAllUsers());
        socket.emit('message', socket_2.newMessage(`Welcome ${userName}`, 'SERVER'));
        socket.on('message', (message) => {
            clearTimeout(inactivityTimer);
            startInactivityTimer();
            logger_1.logger.info(`new message - ${userName}: ${message}`);
            io.emit('message', socket_2.newMessage(message, userName));
        });
        socket.on('typing', () => {
            clearTimeout(inactivityTimer);
            startInactivityTimer();
            socket_2.storeTypingUser({ id, userName });
            socket.emit('typing', socket_2.typingUsers);
        });
        socket.on('stopped_typing', () => {
            socket_2.removeTypingUser(id);
            clearTimeout(inactivityTimer);
            startInactivityTimer();
            socket.emit('typing', socket_2.typingUsers);
        });
        socket.on('disconnect', (reason) => {
            if (reason === 'client namespace disconnect') {
                logger_1.logger.info(`user left the chat: ${userName} ${id}`);
                socket.broadcast.emit('message', socket_2.newMessage(`${userName} has left the chat`, 'SERVER'));
            }
            if (reason === 'server namespace disconnect') {
                logger_1.logger.info(`user kicked due to inactivity: ${userName} ${id}`);
                socket.broadcast.emit('message', socket_2.newMessage(`${userName} got kicked due to inactivity`, 'SERVER'));
            }
            clearTimeout(inactivityTimer);
            socket_2.removeUser(id);
            socket_2.removeTypingUser(id);
            io.emit('connected_users', socket_2.getAllUsers());
            console.log(`${userName} disconnected`);
        });
    });
};
