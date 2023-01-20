import jwt from 'jsonwebtoken';

import { JwtPayload } from 'types/JwtPayload';

/**
 * Includes user data on the payload.
 * @param payload
 */
export default function createJwtToken(payload: JwtPayload): string {
	return jwt.sign(payload, process.env.JWT_SECRET!, {
		expiresIn: process.env.JWT_EXPIRATION,
	});
}
