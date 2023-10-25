import sendRes from '../common/response.common';
import { prisma } from '../prisma';
import { Response } from '../types/response.types';

export async function getUsers(): Promise<Response> {
	try {
		const result = await prisma.users.findMany({
			select: {
				uuid: true,
				profile_picture: true,
				display_name: true,
				username: true,
				email: true,
				about: true,
			},
		});
		return sendRes(200, 'Success', result);
	} catch (err) {
		return sendRes(500, 'Server error', [err]);
	}
}
