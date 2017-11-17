import config from 'config';
import path from 'path';

const winston = require('winston');

const transports = [];

let logFolder;

if (config.has('logging.console')) {
  transports.push(new (winston.transports.Console)({
    colorize: true,
    timestamp: true,
    handleExceptions: true,
    humanReadableUnhandledException: true
  }));
}

if (config.has('logging.file') && config.has('logging.folder')) {
  logFolder = nconf.get('logging.folder') || path.join(__dirname, '../..', 'logs');

  transports.push(new (winston.transports.File)({
    filename: path.join(logFolder, config.get('logging.file')),
    name: 'errorsFile',
    level: config.get('logging:level') || 'sql',
    timestamp: true,
    handleExceptions: true,
    json: false,
    humanReadableUnhandledException: true
  }));
}

winston.configure({
  transports: transports
});

export default winston;

