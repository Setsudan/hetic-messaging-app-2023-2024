import express from 'express';
import { channelPostRouter } from './post';
import { channelGetRouter } from './get';
import { channelDeleteRouter } from './delete';
const router = express.Router();

router.use('/', channelPostRouter);
router.use('/', channelGetRouter);
router.use('/', channelDeleteRouter);

export { router as channelRouter };
