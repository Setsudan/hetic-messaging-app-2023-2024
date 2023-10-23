import { Request, Response } from 'express';
import express from 'express';
export const router = express.Router();

router.get('/', (req: Request, res:Response) => {
	const response = {
		code: 200,
		message: 'Default router is working!',
		data: ['Hello World !'],
		requestTime: new Date(),
		apiVersion: process.env.API_VERSION,
	};
	res.status(response.code).json(response);
});

export { router as defaultGetRouter };