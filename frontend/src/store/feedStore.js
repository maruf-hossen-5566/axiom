import { create } from "zustand/react";
import { persist } from "zustand/middleware";

const initialStore = {
	featured: null,
	posts: null,
};

export const useFeedStore = create(
	persist(
		(set) => ({
			...initialStore,

			setFeatured: (data) =>
				set({
					featured: data,
				}),
			setPosts: (data) =>
				set({
					posts: data,
				}),
			clearFeedStore: () =>
				set({
					...initialStore,
				}),
		}),
		{
			name: "feed-storage",
			getStorage: () => localStorage,
		}
	)
);
