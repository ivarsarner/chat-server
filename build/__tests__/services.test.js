"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __mock__1 = require("../__mock__");
const socket_1 = require("../services/socket");
describe('Testing services/socket/connectedUsers', () => {
    beforeAll(() => {
        socket_1.storeUser(__mock__1.mockUser);
        __mock__1.mockUsers.forEach((user) => {
            socket_1.storeUser(user);
        });
        socket_1.storeTypingUser(__mock__1.mockUser);
    });
    test('check username to be true', () => {
        expect(socket_1.isUserNameTaken('test')).toBeTruthy();
    });
    test('check username to be false', () => {
        expect(socket_1.isUserNameTaken('should not exist')).toBeFalsy();
    });
    test('getUser', () => {
        expect(socket_1.getUser('should not exist')).toBeFalsy();
    });
    test('get all users', () => {
        expect(socket_1.getAllUsers()).toHaveLength(11);
    });
    test('store typing user', () => {
        expect(socket_1.typingUsers).toHaveLength(1);
    });
    test('remove typing user', () => {
        socket_1.removeTypingUser(__mock__1.mockUser.id);
        expect(socket_1.typingUsers).toHaveLength(0);
    });
    test('remove user', () => {
        socket_1.removeUser(__mock__1.mockUser.id);
        expect(socket_1.connectedUsers).toHaveLength(10);
    });
    test('creating a message', () => {
        const msg = socket_1.newMessage(__mock__1.mockMsg.message, __mock__1.mockMsg.userName);
        expect(msg.userName).toBe('Santa');
    });
});
