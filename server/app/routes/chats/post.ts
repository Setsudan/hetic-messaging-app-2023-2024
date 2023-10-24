import express from 'express';
import { createChat } from '../../handlers/chats';
import { Request, Response } from 'express';
import { v4 as generateUUID } from 'uuid';
import sendRes from '../../common/response.common';
const router = express.Router();

router.post('/create', async (req: Request, res: Response) => {
	const requestBody = req.body;

	if (Object.keys(requestBody).length === 0) {
		return res.status(400).json(sendRes(400, 'Request body is empty', []));
	}

	const chat = await createChat({
		name: requestBody.name,
		uuid: generateUUID(),
		group_uuid: null,
		created_at: new Date(),
		updated_at: new Date(),
	});

	res.status(200).json(sendRes(200, 'Success', [chat]));
});

export { router as chatPostRouter };
