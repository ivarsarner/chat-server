import { startTimer, removeTimer, restartTimer } from '../../utils/timer';
import { socketDisconnect } from './socketEvents';
import { Timer } from '../../types';

const timeMs = 30000;

let inactivityTimer: Timer;

export const startInactivityTimer = () => startTimer(inactivityTimer, socketDisconnect, timeMs);
export const removeInactivityTimer = () => removeTimer(inactivityTimer);
export const restartInactivityTimer = () => restartTimer(inactivityTimer, socketDisconnect, timeMs);
