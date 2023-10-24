import { prisma } from '../prisma';
import { Chats } from '@prisma/client';
import { Response } from '../types/response.types';
import sendRes from '../common/response.common';

export async function createChat(body: Chats): Promise<unknown> {
	try {
		const chat = await prisma.chats.create({
			data: {
				...body,
			},
		});
		return chat;
	}
	catch (err) {
		return err;
	}
}

export async function getChats(): Promise<Response> {
	try {
		const chats = await prisma.chats.findMany({
			select: {
				name: true,
				uuid: true,
				group_uuid: true,
				created_at: true,
				updated_at: true,
			},
		});
		return sendRes(200, 'Success', chats);
	}
	catch (err) {
		return sendRes(500, 'Server error', [err]);
	}
}