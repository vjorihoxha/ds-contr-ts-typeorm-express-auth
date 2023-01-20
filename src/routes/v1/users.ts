import { Router } from 'express';
import Container from 'typedi';

import UserController from 'controllers/users/UserController';
import { UserEditValidator } from 'validations/users';

const userController = Container.get(UserController);

const router = Router();

router.get('/', (req, res, next) => userController.list(req, res, next));

router.get('/:id', (req, res, next) => userController.show(req, res, next));

router.patch('/:id', [UserEditValidator], (req, res, next) =>
	userController.edit(req, res, next),
);

router.delete('/:id', (req, res, next) =>
	userController.destroy(req, res, next),
);

export default router;
