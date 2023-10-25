import express from 'express';
import { Request, Response } from 'express';
import { deleteChannel } from '../../handlers/channel';

const router = express.Router();

router.delete('/delete', (req: Request, res: Response) => {
	const {channel_uuid } = req.body;
	deleteChannel(channel_uuid).then(response => {
		res.status(response.code).json(response);
	});
});

export { router as channelDeleteRouter };