import Pool from 'pg';

// TODO: init postgresql database

export const pool = new Pool.Pool({
	user: 'to_determine',
	host: 'localhost',
	database: 'to_determine',
	password: '',
	port: 5432,
});