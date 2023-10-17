import express from 'express';
import { Request, Response } from 'express';
import { UserForSignUp } from '../../types/user.type';
import { createUser,loginUser } from '../../handlers/auth';

const router = express.Router();

const emailRegex = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])');
// password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character

router.post('/signUp', (req: Request, res: Response) => {
	console.log('received signUp request');
	const user: UserForSignUp = req.body;

	if (Object.keys(user).length === 0) {
		console.log('body is empty');
		res.status(400).json({
			code: 400,
			requestTime: new Date(),
			message: 'Body is empty',
			apiVersion: process.env.API_VERSION || '',
			data: [],
		});
	} else if (!emailRegex.test(user.email)) {
		console.log('email is not valid');
		res.status(400).json({
			code: 400,
			requestTime: new Date(),
			message: 'Email is not valid',
			apiVersion: process.env.API_VERSION || '',
			data: [],
		});
	} else if (!passwordRegex.test(user.password)) {
		console.log('password is not valid');
		res.status(400).json({
			code: 400,
			requestTime: new Date(),
			message: 'Password is not valid',
			apiVersion: process.env.API_VERSION || '',
			data: [],
		});
	}
	console.log('creating user');
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

