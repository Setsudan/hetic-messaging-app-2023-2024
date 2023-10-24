/* Packages */
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { mainRouter } from './routes/router';
import WebSocket from 'ws';

/* Configuration */
dotenv.config({ path: path.join(__dirname, '../.env') });

/* Routes */
const app = express();
app.use('/', mainRouter);


/* Server and websocket */
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
	console.log(`WebSocket listening on URL ws://localhost:${port}`);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {
	console.log('db connected');

	ws.on('message', (message: string) => {
		console.log('Message received: ' + message);
		ws.send('Message received: ' + message);
	});

	ws.on('close', () => {
		console.log('db disconnected');
	});
});
