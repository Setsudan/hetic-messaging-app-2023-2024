/* Packages */
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { mainRouter } from './routes/router';
import ws from 'ws';

/* Configuration */
dotenv.config({ path: path.join(__dirname, '../.env') });

/* Routes */
const app = express();
app.use('/', mainRouter);

/* Websocket */

export const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {
	socket.on('message', message => console.log(message));
});

/* Server */
const port = process.env.PORT || 3000;
const server = app.listen(port);

server.on('upgrade', (request, socket, head) => {
	wsServer.handleUpgrade(request, socket, head, socket => {
		wsServer.emit('connection', socket, request);
	});
});