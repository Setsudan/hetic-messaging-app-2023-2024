import express from 'express';
import { filePostRouter } from './post';
const router = express.Router();

router.use('/', filePostRouter);

export { router as filesRouter };
