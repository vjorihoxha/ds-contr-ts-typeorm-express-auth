import { Router } from 'express';

import checkJwtMiddleware from 'middlewares/CheckJwtMiddleware';

import auth from './auth';
import users from './users';

const router = Router();

router.use('/auth', auth);
router.use('/users', [checkJwtMiddleware], users);

export default router;
