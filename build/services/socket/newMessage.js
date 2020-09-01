"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newMessage = void 0;
const uuid_1 = require("uuid");
exports.newMessage = (message, userName) => {
    const timestamp = Date.now();
    return {
        userName,
        message,
        timestamp,
        id: uuid_1.v4(),
    };
};
