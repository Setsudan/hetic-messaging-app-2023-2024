import { getChats } from '../../handlers/chats';
import express from 'express';
import { Response } from '../../types/response.types';
import sendRes from '../../common/response.common';
const router = express.Router();

router.get('/getAll', async (req, res) => {
	try {
		const result: Response = await getChats();
		if (result.code === 500) {
			res.status(500).json(result);
		} else {
			res.status(200).json(result);
		}
	} catch (error) {
		res.status(500).json(sendRes(500, 'Server error', [error]));
	}
});

export { router as chatGetRouter };
