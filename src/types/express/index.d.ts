import { JwtPayload } from '../JwtPayload';

/**
 * Request will be added the jwt payload which will be the user data
 * Response will have a uniform success response so the frontend can always expect the same structure.
 */
declare global {
	namespace Express {
		export interface Request {
			jwtPayload: JwtPayload;
		}
		export interface Response {
			customSuccess(
				httpStatusCode: number,
				message: string,
				data?: any,
			): Response;
		}
	}
}
