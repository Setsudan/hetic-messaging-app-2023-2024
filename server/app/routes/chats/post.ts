import express from 'express';
import { createChat } from '../../handlers/chats';
import { Request, Response } from 'express';
import { v4 as generateUUID } from 'uuid';
const router = express.Router();

router.post('/create', async (req: Request, res: Response) => {
	const requestBody = req.body;

	if (Object.keys(requestBody).length === 0) {
		return res.status(400).json({
			code: 400,
			requestTime: new Date(),
			message: 'Body is empty',
			apiVersion: process.env.API_VERSION || '',
			data: [],
		});
	}

	const chat = await createChat({
		name: requestBody.name,
		uuid: generateUUID(),
		group_uuid: null,
		created_at: new Date(),
		updated_at: new Date(),
	});

	res.status(200).json({
		code: 200,
		requestTime: new Date(),
		message: 'Success',
		apiVersion: process.env.API_VERSION || '',
		data: [chat],
	});
});


export {router as chatPostRouter};