import express from 'express';
import { Request, Response } from 'express';
import { UserForSignUp } from '../../types/user.type';
import { createUser,loginUser } from '../../handlers/auth';
import sendRes from '../../common/response.common';

const router = express.Router();

const emailRegex = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])');

router.post('/signUp', (req: Request, res: Response) => {
	console.log('received signUp request');
	const user: UserForSignUp = req.body;

	if (Object.keys(user).length === 0) {
		res.status(400).json(sendRes(400, 'User is empty', []));
	} else if (!emailRegex.test(user.email)) {
		res.status(400).json(sendRes(400, 'Email is not valid', []));
	} else if (!passwordRegex.test(user.password)) {
		res.status(400).json(sendRes(400, 'Password is not valid', []));
	}
	createUser(user).then((response) => {
		res.status(200).json(response);
	});

});



router.post('/login', (req: Request, res: Response) => {
	const { identity, password } = req.body;
	loginUser(identity, password)
		.then((response) => {
			res.status(response.code).json(response);
		});
});


export { router as authPostRouter };

