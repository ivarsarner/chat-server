import { startTimer, removeTimer, restartTimer } from '../../utils/timer';
import { Timer, Socket } from '../../types';

let inactivityTimer: Timer;

export const startInactivityTimer = (socket: Socket, timeMs: number): void => {
  startTimer(
    inactivityTimer,
    () => {
      socket.disconnect(true);
    },
    timeMs
  );
};

export const removeInactivityTimer = (): void => {
  if (inactivityTimer) removeTimer(inactivityTimer);
};

export const restartInactivityTimer = (socket: Socket, timeMs: number): void => {
  restartTimer(
    inactivityTimer,
    () => () => {
      socket.disconnect(true);
    },
    timeMs
  );
};
