import { createJSONStorage } from "zustand/middleware";
import { create } from "zustand/react";
import { del, get, set } from "idb-keyval";

const initialStore = {
	profile: null,
	posts: null,
};

export const useProfileStore = create(
	(set) => ({
		...initialStore,

		setProfile: (data) =>
			set({
				profile: data,
			}),
		setPosts: (data) =>
			set({
				posts: data,
			}),
		clearPost: () =>
			set({
				post: null,
			}),
		clearPostStore: () => set({ ...initialStore }),
	}),
	{
		name: "profile-storage",
		storage: createJSONStorage(() => sessionStorage),
	}
);
