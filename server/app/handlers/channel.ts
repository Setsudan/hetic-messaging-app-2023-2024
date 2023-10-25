import { prisma } from '../prisma';
import sendRes from '../common/response.common';
import { v4 as uuidGenerator } from 'uuid';
import { Channels } from '@prisma/client';

export async function createChannel(creator_uuid: string, channel: Channels, receiver_uuid: string) {
	// we first create a channel then we create a user channe once we get the uuid of the channel
	try {
		const newChannel = await prisma.channels.create({
			data: {
				uuid: uuidGenerator(),
				name: channel.name,
				type: channel.type,
			},
		});
		const userChannel = await prisma.user_s_Channel.createMany({
			data: [
				{
					user_uuid: creator_uuid,
					channel_uuid: newChannel.uuid,
				},
				{
					user_uuid: receiver_uuid,
					channel_uuid: newChannel.uuid,
				}
			]
		});
		return sendRes(201, 'Success', [newChannel, userChannel]);
	} catch (err) {
		return sendRes(500, 'Server error', [err]);
	}
}


export async function getAllChannels() {
	try {
		const channels = await prisma.channels.findMany();
		return sendRes(200, 'Success', channels);
	} catch (err) {
		return sendRes(500, 'Server error', [err]);
	}
}

export async function deleteChannel(channel_uuid: string) {
	// we need to delete all user's channel where channel_uuid is equal to the channel_uuid and then delete the channel
	try {
		const userChannel = await prisma.user_s_Channel.deleteMany({
			where: {
				channel_uuid
			}
		});
		const channel = await prisma.channels.delete({
			where: {
				uuid: channel_uuid
			}
		});
		return sendRes(200, 'Success', [userChannel, channel]);
	} catch (err) {
		return sendRes(500, 'Server error', [err]);
	}
}

export async function getAllUsersChannel() {
	try {
		const userChannel = await prisma.user_s_Channel.findMany();
		return sendRes(200, 'Success', userChannel);
	} catch (err) {
		return sendRes(500, 'Server error', [err]);
	}
}