import { create } from "zustand/react";

const initialStore = {
	posts: null,
	postSortBy: "newest",
	postSearchQuery: "",
	bookmarks: null,
	bookmarkSearchQuery: "",
	followers: null,
	followersSearchQuery: "",
	following: null,
	followingSearchQuery: "",
	analyticsFilter: "30days",
	blockList: null,
	blockListSearchQuery: "",
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
	setFollowers: (data) =>
		set({
			followers: data,
		}),
	setFollowersSearchQuery: (data) =>
		set({
			followersSearchQuery: data,
		}),
	setBookmarkSearchQuery: (data) =>
		set({
			bookmarkSearchQuery: data,
		}),
	setFollowingSearchQuery: (data) =>
		set({
			followingSearchQuery: data,
		}),
	setFollowing: (data) =>
		set({
			following: data,
		}),
	setAnalyticsFilter: (data) =>
		set({
			analyticsFilter: data,
		}),
	setBlockList: (data) =>
		set({
			blockList: data,
		}),
	setBlockListSearchQuery: (data) =>
		set({
			blockListSearchQuery: data,
		}),
	setBookmarks: (data) =>
		set({
			bookmarks: data,
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
