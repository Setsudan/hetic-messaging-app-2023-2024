import { Client } from 'pg';

const db = new Client({
	user: process.env.DB_USER,
	host: 'postgres',
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: parseInt(process.env.DB_PORT || '5432'),
});

db.connect();

export default db;
