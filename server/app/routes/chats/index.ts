import express from 'express';
import { chatPostRouter } from './post';
import { chatGetRouter } from './get';
const router = express.Router();

router.use('/', chatPostRouter);
router.use('/', chatGetRouter);

export { router as chatsRouter };
