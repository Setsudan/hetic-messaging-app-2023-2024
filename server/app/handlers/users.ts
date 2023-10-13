import { Response } from '../types/response.types';
import client from '../pg';

export async function getUsers(): Promise<Response> {
	try {
		await client.connect();
		const result = await client.query('SELECT user_id, username, email, created_at FROM users');
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