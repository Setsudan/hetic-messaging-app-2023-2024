import { prisma } from '../prisma';
import { Chats } from '@prisma/client';
import { Response } from '../types/response.types';
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
		return {
			code: 200,
			requestTime: new Date(),
			message: 'Success',
			apiVersion: process.env.API_VERSION || '',
			data: chats,
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