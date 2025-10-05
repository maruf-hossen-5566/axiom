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
	blocked: null,
	blockedPageNumber: 1,
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
	setBlocked: (data) =>
		set({
			blocked: data,
		}),
	setBlockedPageNumber: (data) =>
		set({
			blockedPageNumber: data,
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
