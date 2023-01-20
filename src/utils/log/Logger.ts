import winston, { Logger } from 'winston';
import { MongoDB, MongoDBConnectionOptions } from 'winston-mongodb';

// Define severity levels.
const levels = {
	error: 0,
	warn: 1,
	http: 2,
	info: 3,
	debug: 4,
};

// Chose the aspect of your log customizing the log format.
const format = winston.format.combine(
	// Add the message timestamp with the preferred format
	winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
	// Tell Winston that the logs must be colored
	// Define the format of the message showing the timestamp, the level and the message
	winston.format.printf(
		(info) => `${info.timestamp} ${info.level}: ${info.message}`,
	),
	winston.format.json(),
	winston.format.metadata(),
);

const finalMongoOptions: MongoDBConnectionOptions = {
	db: 'mongodb://localhost:27017/loggs',
	collection: 'info',
	level: 'debug',
};

const transports = [
	new winston.transports.Console(),
	new winston.transports.File({
		filename: 'logs/error.log',
		level: 'error',
	}),
	new MongoDB(finalMongoOptions),
	new winston.transports.File({ filename: 'logs/all.log' }),
];

const logger = winston.createLogger({
	handleExceptions: true,
	format,
	transports,
	levels,
});

export default logger;
