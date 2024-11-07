import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import { config } from '../config';

const isProduction = config.node_env === 'production';
const isDevelopment = config.node_env === 'development';

const transports = [];

if (isDevelopment) {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

if (isProduction) {
  const transport: DailyRotateFile = new DailyRotateFile({
    filename: path.resolve('logs', 'app-%DATE%.log'),
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '5m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  });

  transport.on('error', (error) => {
    console.error('Logger error:', error);
  });

  transports.push(transport);
}

const logger = winston.createLogger({
  level: config.node_env === 'production' ? 'info' : 'debug',
  transports,
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
  logger.error('Unhandled Promise Rejection:', error);
});

export default logger;
