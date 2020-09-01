"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTypingUser = exports.storeTypingUser = exports.removeUser = exports.storeUser = exports.getAllUsers = exports.getUser = exports.isUserNameTaken = exports.typingUsers = exports.connectedUsers = void 0;
exports.connectedUsers = [];
exports.typingUsers = [];
exports.isUserNameTaken = (userName) => exports.connectedUsers.some((user) => user.userName.toLowerCase() === userName.toLowerCase());
exports.getUser = (id) => exports.connectedUsers.find((user) => user.id === id);
exports.getAllUsers = () => exports.connectedUsers;
exports.storeUser = (user) => {
    exports.connectedUsers.push(user);
};
exports.removeUser = (id) => {
    exports.connectedUsers = exports.connectedUsers.filter((user) => user.id !== id);
};
exports.storeTypingUser = (user) => {
    if (!exports.typingUsers.find((typingUser) => typingUser.id === user.id)) {
        exports.typingUsers.push(user);
    }
};
exports.removeTypingUser = (id) => {
    exports.typingUsers = exports.typingUsers.filter((user) => user.id !== id);
};
