import db from '../pg';
import { UserForSignUp } from '../types/user.type';
import { Response } from '../types/response.types';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

const uuidGenerator = uuid;

export async function createUser(body: UserForSignUp) {
	try {
		const { display_name, username, password, phone_number, email } = body;
		const hashedPassword = await hash(password, 10);
		const query = `
			INSERT INTO users (uid, display_name, username, password, phone_number, email)
			VALUES ($1, $2, $3, $4, $5, $6)
			RETURNING uid, display_name, username, phone_number, email;
		`;
		const values = [uuidGenerator(), display_name, username, hashedPassword, phone_number, email];
		const { rows } = await db.query(query, values);
		return rows[0];
	}
	catch (err) {
		return err;
	}
}

export async function loginUser(identity: string, password: string): Promise<Response> {
	console.log('loginUser', identity, password);
	try {
		const query = `
			SELECT uid, username, password
			FROM users
			WHERE username=$1 OR email=$1;
		`;
		const { rows } = await db.query(query, [identity]);
		const user = rows[0];

		console.log(rows,user);

		if (!user) {
			console.log('user not found');
			return {
				code: 404,
				requestTime: new Date(),
				message: 'User not found',
				apiVersion: process.env.API_VERSION || '',
				data: [],
			};
		}

		const valid = await compare(password, user.password);

		if (!valid) {
			return {
				code: 401,
				requestTime: new Date(),
				message: 'Invalid password',
				apiVersion: process.env.API_VERSION || '',
				data: [],
			};
		}

		const token = process.env.JWT_SECRET ? sign({ uid: user.uid }, process.env.JWT_SECRET) : '';

		return {
			code: 200,
			requestTime: new Date(),
			message: 'Success',
			apiVersion: process.env.API_VERSION || '',
			data: [token],
		};
	}
	catch (err) {
		return {
			code: 500,
			requestTime: new Date(),
			message: 'Server error',
			apiVersion: process.env.API_VERSION || '',
			data: [err],
		};
	}
}

