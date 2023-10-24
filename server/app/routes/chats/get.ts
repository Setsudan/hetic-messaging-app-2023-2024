import { getChats } from '../../handlers/chats';
import express from 'express';
import {Response} from '../../types/response.types';
const router = express.Router();

router.get('/getAll',  async (req, res) => {
	try {
		const result: Response = await getChats();
		if (result.code === 500) {
			res.status(result.code).json(result);
		} else {
			res.status(200).json(result);
		}
	} catch (error) {
		res.status(500).json({ code: 500, message: 'Server error' });
	}
});

export {router as chatGetRouter};