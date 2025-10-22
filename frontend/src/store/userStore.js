import { persist } from "zustand/middleware";
import { create } from "zustand/react";

const initialStore = {
	isAuthenticated: false,
	user: null,
	followingIds: [],
	blockedIds: [],
	bookmarkedIds: [],
	followedTags: [],
};

const useUserStore = create(
	persist(
		(set) => ({
			...initialStore,

			setFollowingIds: (data) =>
				set({
					followingIds: data,
				}),
			setBlockedIds: (data) =>
				set({
					blockedIds: data,
				}),
			setBookmarkedIds: (data) =>
				set({
					bookmarkedIds: data,
				}),
			setFollowedTags: (data) =>
				set({
					followedTags: data,
				}),
			setUser: (data) =>
				set({
					user: data,
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
