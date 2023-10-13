import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const options: swaggerJsdoc.Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Messaging backend API',
			version: '0.0.1',
			description: 'Yahallo',
		},
	},
	apis: [path.join(__dirname, './routes/**/*.ts')], 
};

export const specs = swaggerJsdoc(options);