export type Response = {
	code: number;
	requestTime: Date;
	message: string;
	apiVersion: string;
	data: unknown[];
};
