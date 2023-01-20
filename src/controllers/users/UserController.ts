import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { getRepository } from 'typeorm';

import { User } from 'orm/entities/User';
import { CustomError } from 'utils/response/custom-error/CustomError';

import BaseController from '../BaseController';

@Service()
export default class UserController extends BaseController {
	async list(req: Request, res: Response, next: NextFunction) {
		const userRepository = getRepository(User);
		try {
			const users = await userRepository.find();
			res.customSuccess(200, 'List of users.', users);
		} catch (err) {
			const customError = new CustomError(
				400,
				'Raw',
				`Can't retrieve list of users.`,
				null,
				err,
			);
			return next(customError);
		}
	}

	async show(req: Request, res: Response, next: NextFunction) {
		const id = req.params.id;

		const userRepository = getRepository(User);

		try {
			const user = await userRepository.findOne(id);

			if (!user) {
				const customError = new CustomError(
					404,
					'General',
					`User with id:${id} not found.`,
					['User not found.'],
				);
				return next(customError);
			}
			res.customSuccess(200, 'User found', user);
		} catch (err) {
			const customError = new CustomError(400, 'Raw', 'Error', null, err);
			return next(customError);
		}
	}

	async edit(req: Request, res: Response, next: NextFunction) {
		const id = req.params.id;
		const { name } = req.body;

		const userRepository = getRepository(User);
		try {
			const user = await userRepository.findOne({ where: { id } });

			if (!user) {
				const customError = new CustomError(
					404,
					'General',
					`User with id:${id} not found.`,
					['User not found.'],
				);
				return next(customError);
			}

			user.name = name;

			try {
				await userRepository.save(user);
				res.customSuccess(200, 'User successfully saved.');
			} catch (err) {
				const customError = new CustomError(
					409,
					'Raw',
					`User '${user.email}' can't be saved.`,
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

	async destroy(req: Request, res: Response, next: NextFunction) {
		const id = req.params.id;

		const userRepository = getRepository(User);
		try {
			const user = await userRepository.findOne({ where: { id } });

			if (!user) {
				const customError = new CustomError(
					404,
					'General',
					'Not Found',
					[`User with id:${id} doesn't exists.`],
				);
				return next(customError);
			}

			await userRepository.softDelete(id);

			res.customSuccess(200, 'User successfully deleted.', {
				id: user.id,
				name: user.name,
				email: user.email,
			});
		} catch (err) {
			const customError = new CustomError(400, 'Raw', 'Error', null, err);
			return next(customError);
		}
	}
}
