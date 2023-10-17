import { Response } from '../types/response.types';
import client from '../pg';

export async function getUsers(): Promise<Response> {
	try {
		const result = await client.query('SELECT profile_picture, display_name, username, phone_number, email, about FROM users');
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
	}
}

export async function doesUserExist(username: string, email:string): Promise<boolean> {
	try {
		const result = await client.query('SELECT uid FROM users WHERE username=$1 OR email=$2', [username, email]);
		return result.rowCount > 0;
	} catch (err) {
		return false;
	} 
}