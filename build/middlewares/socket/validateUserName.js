"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserName = void 0;
const socket_1 = require("../../services/socket");
const logger_1 = require("../../logger");
exports.validateUserName = (socket, next) => {
    const { userName } = socket.handshake.query;
    const regex = /\b\w{3,12}\b/i;
    if (!regex.test(userName)) {
        logger_1.logger.info(`connection rejected - userName not desired length: ${userName}`);
        return next(new Error('userName_length'));
    }
    if (userName.toUpperCase() === 'SERVER') {
        logger_1.logger.info('connection rejected - userName === "SERVER"');
        return next(new Error('userName_server'));
    }
    if (socket_1.isUserNameTaken(userName)) {
        logger_1.logger.info(`connection rejected - userName taken: ${userName}`);
        return next(new Error('userName_taken'));
    }
    next();
};
