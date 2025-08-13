import { persist } from "zustand/middleware";
import { create } from "zustand/react";

const initialStore = {
	isAuthenticated: false,
	user: null,
	followingIds: [],
};

const useUserStore = create(
	persist(
		(set) => ({
			...initialStore,

			setFollowingIds: (data) =>
				set({
					followingIds: data,
				}),
			login: (userData) =>
				set({
					isAuthenticated: true,
					user: userData,
				}),
			logout: () =>
				set({
					...initialStore,
				}),
		}),
		{
			name: "user-storage",
			getStorage: () => localStorage,
		}
	)
);

export default useUserStore;
