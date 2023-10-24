import { prisma } from '../prisma';
import { UserForSignUp } from '../types/user.type';
import { Response } from '../types/response.types';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

const uuidGenerator = uuid;

export async function createUser(body: UserForSignUp): Promise<Response> {
	try {
		const { display_name, username, password, email } = body;
		const hashedPassword = await hash(password, 10);
		const user = await prisma.users.create({
			data: {
				uuid: uuidGenerator(),
				display_name,
				username,
				password: hashedPassword,
				email,
				profile_picture: '',
			},
		});
		return {
			code: 200,
			requestTime: new Date(),
			message: 'Success',
			apiVersion: process.env.API_VERSION || '',
			data: [user],
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

export async function loginUser(identity: string, password: string): Promise<Response> {
	try {
		const user = await prisma.users.findFirst({
			where: {
				OR: [
					{ username: identity },
					{ email: identity },
				],
			},
		});
		if (!user) {
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
		const token = process.env.JWT_SECRET ? sign({ uid: user.uuid }, process.env.JWT_SECRET) : '';
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

