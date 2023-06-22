import winston, { format, transports, Logger } from 'winston';

const logger: Logger = winston.createLogger({
  level: 'info',
  format: format.json(),
  defaultMeta: { service: 'new', path: '' },
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'error.log',
      level: 'error',
      format: format.combine(
        format.errors(),
        format.timestamp(),
        format.printf(({ level, message, timestamp }) => {
          return `${timestamp}, ${level}, ${message}`;
        })
      )
    }),
    new transports.File({
      filename: 'combined.log',
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.printf(({ level, message, timestamp, path }) => {
          return `${timestamp}, ${level}, ${path}, ${message}`;
        })
      )
    })
  ]
});

function logInfo(message: string, meta?: any): void {
  logger.log({ level: 'info', message, meta });
}

function logWarn(message: string, meta?: any): void {
  logger.log({ level: 'warn', message, meta });
}

export { logger, logInfo, logWarn };