import logger from './log/Logger';

export default abstract class BaseUtility {
	getLogger() {
		return logger;
	}
}
