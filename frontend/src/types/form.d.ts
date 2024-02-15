export type SignupFormData = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	city: string;
	phone: string;
	dateOfBirth: string;
	gender: string;
};

export type AccountData = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export type ContactData = {
	city: string;
	phone: string;
};

export type UserData = {
	dateOfBirth: string;
	gender: string;
};
