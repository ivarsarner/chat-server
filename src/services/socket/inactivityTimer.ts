import { startTimer, removeTimer, restartTimer } from '../../utils/timer';
import { Timer, Socket } from '../../types';

let inactivityTimer: Timer;

export const startInactivityTimer = (socket: Socket, timeMs: number): void => {
  console.log('timer started');
  startTimer(
    inactivityTimer,
    () => {
      console.log('timer ended');

      socket.disconnect(true);
    },
    timeMs
  );
};

export const removeInactivityTimer = (): void => {
  removeTimer(inactivityTimer);
};

export const restartInactivityTimer = (socket: Socket, timeMs: number): void => {
  console.log('timer RESTARTED');
  restartTimer(
    inactivityTimer,
    () => () => {
      console.log('timer ended after restart');
      socket.disconnect(true);
    },
    timeMs
  );
};
