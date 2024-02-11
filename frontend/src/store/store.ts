import { create } from "zustand";
import { BearStore } from "../types/store";


export const useBearStore = create<BearStore>(set => ({
	bears: 0,
	increment: () => set(state => ({ bears: state.bears + 1 })),
	decrement: () => set(state => ({ bears: state.bears - 1 })),
}));
