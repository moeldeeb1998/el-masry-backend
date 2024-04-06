import * as winston from 'winston';
import 'winston-daily-rotate-file';

// Create transports instance
const transports = [
  new winston.transports.Console(),
  new winston.transports.DailyRotateFile({
    filename: 'logs/%DATE%/app-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
  }),
  new winston.transports.DailyRotateFile({
    filename: 'logs/%DATE%/errors-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    level: 'error',
  }),
];

// Create and export the logger instance
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ level, timestamp, message }) => {
      return `[${level.toUpperCase()}] ${timestamp} - ${message}`;
    }),
  ),
  transports,
});
