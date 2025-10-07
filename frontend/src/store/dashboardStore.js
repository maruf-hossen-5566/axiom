import { create } from "zustand/react";

const initialStore = {
	posts: null,
	postPageNumber: 1,
	postSortBy: "newest",
	postSearchQuery: "",
	bookmarks: null,
	bookmarkSearchQuery: "",
	bookmarkPageNumber: 1,
	followers: null,
	followersSearchQuery: "",
	followersPageNumber: 1,
	following: null,
	followingSearchQuery: "",
	followingPageNumber: 1,
	analyticsFilter: "30days",
	blockList: null,
	blockListSearchQuery: "",
	blockListPageNumber: 1,
};

export const useDashboardStore = create((set) => ({
	...initialStore,

	setPosts: (data) =>
		set({
			posts: data,
		}),
	setPostPageNumber: (data) =>
		set({
			postPageNumber: data,
		}),
	setPostSearchQuery: (data) =>
		set({
			postSearchQuery: data,
		}),
	setFollowers: (data) =>
		set({
			followers: data,
		}),
	setFollowersPageNumber: (data) =>
		set({
			followersPageNumber: data,
		}),
	setFollowersSearchQuery: (data) =>
		set({
			followersSearchQuery: data,
		}),
	setBookmarkSearchQuery: (data) =>
		set({
			bookmarkSearchQuery: data,
		}),
	setBookmarkPageNumber: (data) =>
		set({
			bookmarkPageNumber: data,
		}),
	setFollowingSearchQuery: (data) =>
		set({
			followingSearchQuery: data,
		}),
	setFollowing: (data) =>
		set({
			following: data,
		}),
	setFollowingPageNumber: (data) =>
		set({
			followingPageNumber: data,
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
	setBlockListPageNumber: (data) =>
		set({
			blockListPageNumber: data,
		}),
	setBookmarks: (data) =>
		set({
			bookmarks: data,
		}),
	setBookmarkPageNumber: (data) =>
		set({
			bookmarkPageNumber: data,
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
