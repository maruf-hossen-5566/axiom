import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand/react";
import { del, get, set } from "idb-keyval";

const indexDBStorage = {
	getItem: async (name) => (await get(name)) || null,
	setItem: async (name, value) => await set(name, value),
	removeItem: async (name) => await del(name),
};

const initialStore = {
	post: null,
	comments: null,
};

export const usePostStore = create(
	persist(
		(set) => ({
			...initialStore,

			setPost: (data) =>
				set({
					post: data,
				}),
			setComments: (data) =>
				set({
					comments: data,
				}),
			clearComments: () =>
				set({
					comments: null,
				}),
			clearPost: () =>
				set({
					post: null,
				}),
			clearPostStore: () => set({ ...initialStore }),
		}),
		{
			name: "post-storage",
			getStorage: () => localStorage,
			// storage: createJSONStorage(() => indexDBStorage),
		}
	)
);
