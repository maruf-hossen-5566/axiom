import { create } from "zustand/react";

const initialStore = {
	posts: null,
	postSearchQuery: "",
	postSortBy: "newest",
};

export const useDashboardStore = create((set) => ({
	...initialStore,

	setPosts: (data) =>
		set({
			posts: data,
		}),
	setPostSearchQuery: (data) =>
		set({
			postSearchQuery: data,
		}),
	setPostSortBy: (data) =>
		set({
			postSortBy: data,
		}),
	clearDashboardStore: () =>
		set({
			...initialStore,
		}),
}));
