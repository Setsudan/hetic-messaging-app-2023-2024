export default function sendRes(
	code: 200 | 201 | 400 | 401 | 403 | 404 | 500,
	message: string,
	data: unknown[],
) {
	return {
		code,
		requestTime: new Date(),
		message,
		apiVersion: process.env.API_VERSION || '',
		data,
	};
}
