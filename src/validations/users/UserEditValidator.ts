import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from 'orm/entities/User';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const UserEditValidator = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	let { email } = req.body;
	const errorsValidation: ErrorValidation[] = [];
	const userRepository = getRepository(User);

	email = !email ? '' : email;

	const user = await userRepository.findOne({ email });
	if (user) {
		errorsValidation.push({
			username: `Email '${email}' already exists`,
		});
	}

	if (errorsValidation.length !== 0) {
		const customError = new CustomError(
			400,
			'Validation',
			'Edit user validation error',
			null,
			null,
			errorsValidation,
		);
		return next(customError);
	}
	return next();
};
