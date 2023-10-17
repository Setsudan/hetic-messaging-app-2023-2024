/* Packages */
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { mainRouter } from './routes/router';


/* Configuration */
dotenv.config({ path: path.join(__dirname, '../.env') });

/* Routes */ // if someone goes to "/" we redirect them to "/api/v1"
const app = express();
app.get('/', (req, res) => {
	res.redirect('/api/v1');
});
app.use('/api/v1', mainRouter);

/* Server */
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
	console.log('Jn');
});
