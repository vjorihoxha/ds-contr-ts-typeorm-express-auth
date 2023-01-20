import { response, Response } from 'express';

/**
 * The frontend will have a uniform success response.
 * @param httpStatusCode
 * @param message
 * @param data
 */
response.customSuccess = function (
	httpStatusCode: number,
	message: string,
	data: any = null,
): Response {
	return this.status(httpStatusCode).json({ message, data });
};
