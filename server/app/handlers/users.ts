import { Response } from '../types/response.types';
import client from '../pg';

export async function getUsers(): Promise<Response> {
	console.log('func: getUsers');
	try {
		console.log('try: getUsers');
		await client.connect();
		console.log('connected');
		const result = await client.query('SELECT * FROM users');
		console.log('result', result);
		return {
			code: 200,
			requestTime: new Date(),
			message: 'Success',
			apiVersion: process.env.API_VERSION || '',
			data: result.rows,
		};
	} catch (err) {
		return {
			code: 500,
			requestTime: new Date(),
			message: 'Server error',
			apiVersion: process.env.API_VERSION || '',
			data: [err],
		};
	} finally {
		client.end();
	}
}