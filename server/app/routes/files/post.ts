import express from 'express';
import { uploads } from '../../handlers/files';
import sendRes from '../../common/response.common';

const router = express.Router();

router.post('/upload', uploads.array('files'), uploadFiles);

// @ts-ignore
function uploadFiles(req, res) {
	console.log(req.body);
	console.log(req.files);
	res.json(sendRes(200, 'Files uploaded successfully', req.files));
}

export { router as filePostRouter };