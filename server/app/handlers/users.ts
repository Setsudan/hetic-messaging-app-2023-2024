import { prisma } from '../prisma';
import { Response } from '../types/response.types';

export async function getUsers(): Promise<Response> {
	try {
		const result = await prisma.users.findMany({
			select: {
				profile_picture: true,
				display_name: true,
				username: true,
				email: true,
				about: true,
			},
		});
		return {
			code: 200,
			requestTime: new Date(),
			message: 'Success',
			apiVersion: process.env.API_VERSION || '',
			data: result,
		};
	} catch (err) {
		return {
			code: 500,
			requestTime: new Date(),
			message: 'Server error',
			apiVersion: process.env.API_VERSION || '',
			data: [err],
		};
	}
}