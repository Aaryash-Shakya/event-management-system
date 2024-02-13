/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import serverUrl from "../config.ts";
import { SignupFormData } from "../types/form.ts";
import { useUserStore } from "../store/store.ts";

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

export const isAuthenticated = async (): Promise<false | "user" | "admin"> => {
	if (typeof window == "undefined") {
		return false;
	} else if (localStorage.getItem("jwt")) {
		try {
			const res = await axios.get(`${serverUrl}/api/user/verify-jwt`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
					"Content-Type": "application/json",
				},
			});
			if (res.status !== 200) {
				return false;
			}

			// set store
			useUserStore.setState({ isAuthenticated: res.data.type });
			useUserStore.setState({ userId: res.data.userId });
			useUserStore.setState({ email: res.data.email });

			console.log(res.data);
			return res.data.type;
		} catch (err) {
			console.log(err);
			return false;
		}
	}
	return false;
};
