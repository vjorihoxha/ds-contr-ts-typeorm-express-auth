import { Router } from 'express';
import Container from 'typedi';

import AuthenticationController from 'controllers/auth/AuthenticationController';
import checkJwtMiddleware from 'middlewares/CheckJwtMiddleware';
import {
	AuthChangePasswordValidator,
	AuthLoginValidator,
	AuthRegisterValidator,
} from 'validations/auth';

const authenticationController = Container.get(AuthenticationController);

const router = Router();

router.post('/login', [AuthLoginValidator], (req, res, next) =>
	authenticationController.login(req, res, next),
);
router.post('/register', [AuthRegisterValidator], (req, res, next) =>
	authenticationController.register(req, res, next),
);
router.post(
	'/change-password',
	[checkJwtMiddleware, AuthChangePasswordValidator],
	(req, res, next) => authenticationController.changePassword(req, res, next),
);

export default router;
