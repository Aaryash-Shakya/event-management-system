export type UserModelType = {
	name: string;
	date_of_birth: string;
	gender: string;
	email: string;
	phone: string;
	password: string;
	type: "user" | "admin";
	email_verified: boolean;
    social: null | UserSocialType;
	createdAt: Date;
	updatedAt: Date;
};

type UserSocialType = {
    facebook?: string;
    instagram?: string;
}