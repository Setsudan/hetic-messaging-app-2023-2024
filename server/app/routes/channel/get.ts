import express from 'express';
import { Request, Response } from 'express';

import { getAllChannels, getAllUsersChannel } from '../../handlers/channel';

const router = express.Router();

router.get('/getAll', (req: Request, res: Response) => {
	getAllChannels().then(response => {
		res.status(response.code).json(response);
	});
});

router.get('/getUsersChannel', (req: Request, res: Response) => {
	getAllUsersChannel().then(response => {
		res.status(response.code).json(response);
	});
});

export { router as channelGetRouter };