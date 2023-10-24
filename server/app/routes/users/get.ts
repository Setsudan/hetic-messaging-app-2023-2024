import express from 'express';
const router = express.Router();
import { getUsers } from '../../handlers/users';
import { Response } from '../../types/response.types';
import sendRes from '../../common/response.common';


router.get('/getAll', async (req, res) => {
	try {
		const result: Response = await getUsers();
		if (result.code === 500) {
			res.status(result.code).json(result);
		} else {
			res.status(200).json(result);
		}
	} catch (error) {
		res.status(500).json(sendRes(500, 'Server error', [error]));
	}
});


export {router as userGetRouter};