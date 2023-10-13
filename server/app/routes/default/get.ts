import { Request, Response } from 'express';
import express from 'express';

export const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Default
 * description: API operations for default routes
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Default route
 *     tags: [Default]
 *     description: Returns a default message indicating that the router is working.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               code: 200
 *               message: Default router is working!
 *               data:
 *                 - Hello World !
 *               requestTime: "2023-10-13T00:00:00.000Z"
 *               apiVersion: x.x.x
 */

router.get('/', (req: Request, res:Response) => {
	const response = {
		code: 200,
		message: 'Default router is working!',
		data: ['Hello World !'],
		requestTime: new Date(),
		apiVersion: process.env.API_VERSION
	};
	res.status(response.code).json(response);
});

export { router as defaultGetRouter };