import express from 'express';
import { userGetRouter } from './get';
const router = express.Router();

router.use('/', userGetRouter);

export {router as userRouter};