/* Packages */
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { mainRouter } from './routes/router';
import WebSocket from 'ws';

/* Configuration */
dotenv.config({ path: path.join(__dirname, '../.env') });

/* Routes */ // if someone goes to "/" we redirect them to "/api/v1"
const app = express();
app.get('/', (req, res) => {
	res.redirect('/api/v1');
});
app.use('/api/v1', mainRouter);


/* Server and websocket */
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
	console.log(`WebSocket listening on URL ws://localhost:${port}`);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {
	console.log('Client connected');

	ws.on('message', (message: string) => {
		console.log('Message received: ' + message);
		ws.send('Message received: ' + message);
	});

	ws.on('close', () => {
		console.log('Client disconnected');
	});
});
