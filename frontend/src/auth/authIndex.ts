import axios from "axios";
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

export const signup = async (user: SignupFormData): Promise<any> => {
	try {
		const res = await fetch(`${serverUrl}/api/user/signup`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		return await res.json();
	} catch (err) {
		console.log(err);
	}
};

export const isAuthenticated = (): boolean | "user" | "admin" => {
	if (typeof window == "undefined") {
		return false;
	} else if (localStorage.getItem("jwt")) {
		axios
			.get(`${serverUrl}/api/user/verify-jwt`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
					"Content-Type": "application/json",
				},
			})
			.then(res => {
				console.log(res.data);
				return res.data.type;
			})
			.catch(err => {
				console.log(err);
				return false;
			});
	}
	return false;
};
