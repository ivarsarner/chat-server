import { Timer, Fn } from '../../types';

export const startTimer = (timer: Timer, callback: Fn, ms: number) => {
  timer = setTimeout(callback, ms);
};

export const removeTimer = (timer: Timer) => clearTimeout(timer);

export const restartTimer = (timer: Timer, callback: Fn, ms: number) => {
  removeTimer(timer);
  startTimer(timer, callback, ms);
};
