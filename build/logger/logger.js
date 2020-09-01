"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const logConfiguration = {
    transports: [
        new winston_1.transports.File({
            filename: './logs/socketIo.log',
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.printf((info) => `${info.timestamp} - [${info.level}]: ${info.message}`)),
        }),
    ],
};
exports.logger = winston_1.createLogger(logConfiguration);
