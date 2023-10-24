import { Request, Response } from 'express';
import express from 'express';
import sendRes from '../../common/response.common';
export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
	res.status(200).json(sendRes(200, 'Success', []));
});

export { router as defaultGetRouter };
