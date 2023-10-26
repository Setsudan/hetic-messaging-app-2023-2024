import sendRes from '../common/response.common';
import { prisma } from '../prisma';
import { Response } from '../types/response.types';

export async function getAllMessages(): Promise < Response > {
	try {
		const result = await prisma.messages.findMany({
			select: {
				uuid: true,
				type: true,
				channel: true,
				created_at: true,
				channel_id: true,
				multimedia: true,
				seen_at: true,
				sender: true,
				text: true,
				sender_id: true,
			}
		});
		return sendRes(200, 'Success', result);
	} catch(err) {
		return sendRes(500, 'Server error', [err]);
	}
}
