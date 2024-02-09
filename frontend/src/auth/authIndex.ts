import serverUrl from "../config.ts";
import { SignupFormData } from "../pages/SignUp.tsx";

type LoginData = {
	email: string;
	password: string;
};

export const login = async (user: LoginData): Promise<any> => {
	try {
		const res = await fetch(`${serverUrl}/api/user/login`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		return await res.json();
	} catch (err) {
		return console.log(err);
	}
};

export const signup = async (user:SignupFormData): Promise<any> => {
	try {
		const res = await fetch(`${serverUrl}/api/user/signup`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		return res.json();
	} catch (err) {
		return console.log(err);
	}
};

export const isAuthenticated = (): boolean => {
	if (typeof window == "undefined") {
		return false;
	} else if (localStorage.getItem("jwt")) {
		return true;
		// call /api/user/verify-user to verify jwt
	}
	return false;
};
