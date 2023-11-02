import express from 'express';
import { Request, Response } from 'express';
import multer from 'multer';
import sendRes from '../../common/response.common';

const router = express.Router();

// Define a storage engine for multer to store uploaded files
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/'); // The destination folder for uploaded files
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname); // Use the original file name for the uploaded file
	},
});

// Create a multer instance with the defined storage engine
const uploads = multer({ storage: storage });

router.post('/upload', uploads.array('files'), uploadFiles);

function uploadFiles(req: Request, res: Response) {
	console.log(req.body);
	console.log(req.files); // req.files will be available when multer middleware is used
	res.json(sendRes(200, 'Files uploaded successfully', []));
}

export { router as filePostRouter };
