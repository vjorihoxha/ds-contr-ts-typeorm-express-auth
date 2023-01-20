import 'reflect-metadata';
import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import multer from 'multer';

import './utils/response/CustomSuccess';
import morganMiddleware from 'middlewares/MorganMiddleware';

import ErrorHandlerMiddleware from './middlewares/ErrorHandlerMiddleware';
import { dbCreateConnection } from './orm/dbCreateConnection';
import routes from './routes';

// create and setup express app and its middlewares
const app = express();
const upload = multer();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(upload.array());
app.use(helmet());
app.use(morganMiddleware);

app.use('/', routes);
app.use(ErrorHandlerMiddleware);

const port = process.env.SERVER_PORT || 8080;
// start express server
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

(async () => {
	await dbCreateConnection();
})();
