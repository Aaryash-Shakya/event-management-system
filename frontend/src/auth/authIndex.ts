import serverUrl from "../config.ts";

type LoginData = {
	email: string;
	password: string;
}

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
