import { Timer } from '../../types';
import { startTimer, removeTimer, restartTimer } from '../../utils/timer';
import { socketDisconnect } from './socketEvents';

let inactivityTimer: Timer;

export const startInactivityTimer = () => startTimer(inactivityTimer, socketDisconnect, 10000);
export const removeInactivityTimer = () => removeTimer(inactivityTimer);
export const restartInactivityTimer = () => restartTimer(inactivityTimer, socketDisconnect, 10000);
