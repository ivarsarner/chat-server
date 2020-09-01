import { transports, createLogger, format } from 'winston';

const logConfiguration = {
  transports: [
    new transports.File({
      filename: './logs/socketIo.log',
      format: format.combine(
        format.timestamp(),
        format.printf((info) => {
          return `${info.timestamp} - [${info.level}]: ${info.message}`;
        })
      ),
    }),
  ],
};

export const logger = createLogger(logConfiguration);
