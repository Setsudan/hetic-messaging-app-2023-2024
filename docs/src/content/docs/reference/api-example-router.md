---
title: Exemple de router pour l'api
description: Exemple de router pour l'api
---

---
`routes/default/index.ts`
```ts 
import { defaultGetRouter } from './get';
import express from 'express';
const router = express.Router();

router.use('/', defaultGetRouter);

export {router as defaultRouter};
```
---
`routes/default/get.ts`
```ts 
import { Request, Response } from 'express';
import express from 'express';
export const router = express.Router();

router.get('/', (req: Request, res:Response) => {
	const response = {
		code: 200,
		message: 'Default router is working!',
		data: ['Hello World !'],
		requestTime: new Date(),
		apiVersion: process.env.API_VERSION,
	};
	res.status(response.code).json(response);
});

export { router as defaultGetRouter };
```
---
