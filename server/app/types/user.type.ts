export type User = {
	uid: string;
	profile_picture: string;
	display_name: string;
	username: string;
	password: string;
	phone_number: string;
	email: string;
	about: string;
};

export type UserForSignUp = {
	display_name: string;
	username: string;
	password: string;
	phone_number?: string;
	email: string;
};
