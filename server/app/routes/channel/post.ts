import express from 'express';
import { Request, Response } from 'express';
import { createChannel } from '../../handlers/channel';

const router = express.Router();

router.post('/create', (req: Request, res: Response) => {
	const { user_uuid, channel,receiver_uuid } = req.body;
	createChannel(user_uuid,channel,receiver_uuid).then(response => {
		res.status(response.code).json(response);
	});
});

export { router as channelPostRouter };