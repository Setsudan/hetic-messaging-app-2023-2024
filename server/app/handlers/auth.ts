import { prisma } from '../prisma';
import { UserForSignUp } from '../types/user.type';
import { Response } from '../types/response.types';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import sendRes from '../common/response.common';

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
		return sendRes(201, 'Success', [user]);
	} catch (err) {
		return sendRes(500, 'Server error', [err]);
	}
}

export async function loginUser(
	identity: string,
	password: string,
): Promise<Response> {
	try {
		const user = await prisma.users.findFirst({
			where: {
				OR: [{ username: identity }, { email: identity }],
			},
		});
		if (!user) {
			return sendRes(404, 'User not found', []);
		}
		const valid = await compare(password, user.password);
		if (!valid) {
			return sendRes(401, 'Invalid password', []);
		}
		const token = process.env.JWT_SECRET
			? sign({ uid: user.uuid }, process.env.JWT_SECRET)
			: '';
		return sendRes(200, 'Success', [{ token }]);
	} catch (err) {
		return sendRes(500, 'Server error', [err]);
	}
}
