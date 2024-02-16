import { create } from "zustand";
import { BearStore, UserStore } from "../types/store";

export const useBearStore = create<BearStore>(set => ({
	bears: 0,
	increment: () => set(state => ({ bears: state.bears + 1 })),
	decrement: () => set(state => ({ bears: state.bears - 1 })),
}));

export const useUserStore = create<UserStore>(set => ({
	isAuthenticated: false,
	userId: null,
	email: null,
	username: null,
	
	// setIsAuthenticated: (auth) => set(()=> ({ isAuthenticated: auth })),
	// setUserId: (id) => set(()=> ({ userId: id })),
	// setEmail: (email) => set(()=> ({ email: email })),
	// setUsername: (username) => set(()=> ({ username: username })),
}));
