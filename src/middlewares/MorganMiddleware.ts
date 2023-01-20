import morgan from 'morgan';

import logger from 'utils/log/Logger';

/*
remove new line \n from morgan
however we are forcing it to write to winston http
remove new line \n from morgan
 */
const stream = {
	// Use the http severity
	write: (message) => logger.http(message.replace(/[\r\n]/gm, '')),
};

const morganMiddleware = morgan(
	':remote-addr :referrer :remote-user :user-agent :method :url :status :res[content-length] :response-time ms :total-time userId= :user_id',
	{ stream },
);

morgan.token('user_id', function (req, res, param) {
	return req.headers['user_id'];
});

export default morganMiddleware;
