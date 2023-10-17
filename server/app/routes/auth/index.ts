import express from 'express';
import { authPostRouter } from './post';
const router = express.Router();

router.use('/', authPostRouter);

export {router as authRouter};