import winston, {format} from "winston";

const defaultFormat =  format.combine(
  format.timestamp(),
  format.splat(),
  format.metadata({ fillExcept: ['message', 'level', 'timestamp'] }),
  format.printf((info) => (Object.keys(info.metadata).length
    ? `${info.timestamp} | [${info.level}] ${info.message} | ${JSON.stringify(info.metadata)}`
    : `${info.timestamp} | [${info.level}] ${info.message}`)),
);
export const logging = () => {
  winston.loggers.add('user_imports', {
    format: defaultFormat,
    transports: [
      new winston.transports.File({ filename: 'storage/logs/user_imports.log' })
    ]
  });
  winston.loggers.add('system', {
    format: defaultFormat,
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'storage/logs/system.log' })
    ]
  });
}