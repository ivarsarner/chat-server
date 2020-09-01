import { mockUsers, mockUser, mockMsg } from '../__mock__';
import {
  isUserNameTaken,
  getUser,
  getAllUsers,
  storeUser,
  removeUser,
  newMessage,
  storeTypingUser,
  typingUsers,
  removeTypingUser,
  connectedUsers,
} from '../services/socket';

describe('Testing services/socket/connectedUsers', () => {
  beforeAll(() => {
    storeUser(mockUser);
    mockUsers.forEach((user) => {
      storeUser(user);
    });
    storeTypingUser(mockUser);
  });
  test('check username to be true', () => {
    expect(isUserNameTaken('test')).toBeTruthy();
  });
  test('check username to be false', () => {
    expect(isUserNameTaken('should not exist')).toBeFalsy();
  });
  test('getUser', () => {
    expect(getUser('should not exist')).toBeFalsy();
  });
  test('get all users', () => {
    expect(getAllUsers()).toHaveLength(11);
  });
  test('store typing user', () => {
    expect(typingUsers).toHaveLength(1);
  });
  test('remove typing user', () => {
    removeTypingUser(mockUser.id);
    expect(typingUsers).toHaveLength(0);
  });
  test('remove user', () => {
    removeUser(mockUser.id);
    expect(connectedUsers).toHaveLength(10);
  });
  test('creating a message', () => {
    const msg = newMessage(mockMsg.message, mockMsg.userName);
    expect(msg.userName).toBe('Santa');
  });
});
