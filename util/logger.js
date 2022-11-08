require('dotenv').config({
  path: '../.env'
});
const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');
const config = require('../config/config');

const env = config.NODE_ENV;
const logDir = 'log';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const infoLog = path.join(logDir, 'fullLogs.log');

const timezoned = () => {
  return new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata'
  })
};

const logTemplate = ({ timestamp, level, ms, message }) => `${timestamp} | ${ms} | ${level} | ${message}`;

const logger = createLogger({
  // change level if in dev environment versus production
  level: env === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.timestamp({ format: timezoned }),
    format.ms(),
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(logTemplate),
      ),
    }),
    new transports.File({
      filename: infoLog,
      format: format.printf(logTemplate),
      level: 'info',
    }),
  ],
});

module.exports = logger;
