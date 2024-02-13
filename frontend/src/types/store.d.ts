export type BearStore = {
	bears: number;
	increment: () => void;
	decrement: () => void;
};

export type UserStore = {
	isAuthenticated: null | "admin" | "user" | false;
	userId: null | number;
	email: null | string;
	username: null | string;
	
	// setIsAuthenticated: (auth: "admin" | "user" | false) => void;
	// setUserId: (id: number) => void;
	// setEmail: (email: string) => void;
	// setUsername: (username: string) => void;
};
