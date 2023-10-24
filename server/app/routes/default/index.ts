import { defaultGetRouter } from './get';
import express from 'express';
const router = express.Router();

router.use('/', defaultGetRouter);

export { router as defaultRouter };
