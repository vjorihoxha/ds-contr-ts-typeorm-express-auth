import { Request, Response, NextFunction } from 'express';

import logger from 'utils/log/Logger';
import { CustomError } from 'utils/response/custom-error/CustomError';

export default function ErrorHandlerMiddleware(
	err: CustomError,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	logger.error(err.JSON.errorMessage, err.JSON);
	return res.status(err.HttpStatusCode).json(err.JSON);
}
