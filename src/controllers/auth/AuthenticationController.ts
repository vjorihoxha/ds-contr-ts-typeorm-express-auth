import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { getRepository } from 'typeorm';

import { User } from 'orm/entities/User';
import TestService from 'services/auth/TestService';
import { JwtPayload } from 'types/JwtPayload';
import createJwtToken from 'utils/jwt/CreateJwtToken';
import { CustomError } from 'utils/response/custom-error/CustomError';

import BaseController from '../BaseController';

@Service()
export default class AuthenticationController extends BaseController {
	constructor(private readonly testService: TestService) {
		super();
	}

	async login(req: Request, res: Response, next: NextFunction) {
		const { email, password } = req.body;

		const meta = {
			source: 'login',
			service: '/auth/login',
		};
		super.getLogger().info('Before login', meta);

		const userRepository = getRepository(User);
		try {
			//Using QueryBuilder in order to add the hidden column which is password
			const user = await userRepository
				.createQueryBuilder()
				.select()
				.addSelect(['User.password'])
				.where('email = :email', { email })
				.getOne();

			if (!user) {
				const customError = new CustomError(
					404,
					'General',
					'Not Found',
					['Incorrect email or password'],
				);
				return next(customError);
			}

			if (!user.checkIfPasswordMatch(password)) {
				const customError = new CustomError(
					404,
					'General',
					'Not Found',
					['Incorrect email or password'],
				);
				return next(customError);
			}

			const jwtPayload: JwtPayload = {
				id: user.id,
				name: user.name,
				email: user.email,
				created_at: user.created_at,
				updated_at: user.updated_at,
			};

			try {
				const token = createJwtToken(jwtPayload);
				res.customSuccess(
					200,
					'Token successfully created.',
					`Bearer ${token}`,
				);
			} catch (err) {
				const customError = new CustomError(
					400,
					'Raw',
					"Token can't be created",
					null,
					err,
				);
				return next(customError);
			}
		} catch (err) {
			const customError = new CustomError(400, 'Raw', 'Error', null, err);
			return next(customError);
		}
	}

	async register(req: Request, res: Response, next: NextFunction) {
		const { email, password, name } = req.body;

		const userRepository = getRepository(User);
		try {
			const user = await userRepository.findOne({ where: { email } });

			if (user) {
				const customError = new CustomError(
					400,
					'General',
					'User already exists',
					[`Email '${user.email}' already exists`],
				);
				return next(customError);
			}

			try {
				const newUser = new User();
				newUser.name = name;
				newUser.email = email;
				newUser.password = password;
				newUser.hashPassword();
				await userRepository.save(newUser);

				res.customSuccess(200, 'User successfully created.');
			} catch (err) {
				const customError = new CustomError(
					400,
					'Raw',
					`User '${email}' can't be created`,
					null,
					err,
				);
				return next(customError);
			}
		} catch (err) {
			const customError = new CustomError(400, 'Raw', 'Error', null, err);
			return next(customError);
		}
	}

	async changePassword(req: Request, res: Response, next: NextFunction) {
		const { password, passwordNew } = req.body;
		const { id, name } = req.jwtPayload;

		const userRepository = getRepository(User);
		try {
			//Using QueryBuilder in order to add the hidden column which is password
			const user = await userRepository
				.createQueryBuilder()
				.select()
				.addSelect(['User.password'])
				.where('id = :id', { id })
				.getOne();

			if (!user) {
				const customError = new CustomError(
					404,
					'General',
					'Not Found',
					[`User ${name} not found.`],
				);
				return next(customError);
			}

			if (!user.checkIfPasswordMatch(password)) {
				const customError = new CustomError(
					400,
					'General',
					'Not Found',
					['Incorrect password'],
				);
				return next(customError);
			}

			user.password = passwordNew;
			user.hashPassword();
			await userRepository.save(user);

			res.customSuccess(200, 'Password successfully changed.');
		} catch (err) {
			const customError = new CustomError(400, 'Raw', 'Error', null, err);
			return next(customError);
		}
	}
}
