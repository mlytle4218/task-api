let appRoot = require('app-root-path');
let winston = require('winston');

// define the custom settings for each transport (file, console)
let winstonOptions = {
    errorFile: {
        level: 'info',
        filename: `${appRoot}/logs/error.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    combinedFile: {
        level: 'debug',
        filename: `${appRoot}/logs/combined.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};



const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File(winstonOptions.errorFile),
        new winston.transports.File(winstonOptions.combinedFile),
    ],
    exitOnError: false
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}




// instantiate a new Winston Logger with the settings defined above
// let logger = winston.createLogger({
//     transports: [
//         new winston.transports.File(winstonOptions.file),
//         new winston.transports.Console(winstonOptions.console)
//     ],
//     exitOnError: false, // do not exit on handled exceptions
// });

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write: function (message, encoding) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message);
    },
};

module.exports = logger;