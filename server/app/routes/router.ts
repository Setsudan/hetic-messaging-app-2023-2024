import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { serve, setup } from 'swagger-ui-express';
import { defaultRouter } from './default/index';
import { userRouter } from './users';
import { specs } from '../swagger';
import { authRouter } from './auth';


dotenv.config({ path: path.join(__dirname, '../../.env.local') });
const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use('/', defaultRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/docs', serve, setup(specs));

//Not found route
router.use((req, res) => {
	const response = {
		code: 404,
		requestTime: new Date(),
		message: 'Not found',
		apiVersion: process.env.API_VERSION,
	};
	res.status(404).json(response);
});

export {router as mainRouter};