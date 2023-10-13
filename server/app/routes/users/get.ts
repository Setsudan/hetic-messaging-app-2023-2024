import express from 'express';
const router = express.Router();
import { getUsers } from '../../handlers/users';
import { Response } from '../../types/response.types';

/**
 * @swagger
 * /users/getAllUsers:
 *  get:
 *   description: Get all users
 *   responses:
 *     200:
 *       description: Success
 *     500:
 *       description: Server error
 */

router.get('/getAll', async (req, res) => {
	try {
		const result: Response = await getUsers();
		if (result.code === 500) {
			res.status(result.code).json(result);
		} else {
			res.status(200).json(result);
		}
	} catch (error) {
		res.status(500).json({ code: 500, message: 'Server error' });
	}
});


export {router as userGetRouter};