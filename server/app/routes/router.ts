import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { defaultRouter } from './default/index';
import { userRouter } from './users';
import { authRouter } from './auth';
import { channelRouter } from './channel';
import sendRes from '../common/response.common';

dotenv.config({ path: path.join(__dirname, '../../.env.local') });
const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use('/', defaultRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/channel', channelRouter);

//Not found route
router.use((req, res) => {
	res.status(404).json(sendRes(404, 'Not found', []));
});

export { router as mainRouter };
