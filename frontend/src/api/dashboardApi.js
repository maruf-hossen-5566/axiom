import apiClient from "@/api/apiClient.js";

export const getPosts = (data) => {
	return apiClient.get("dashboard/posts/", {
		params: { ...data },
	});
};

export const getBookmarks = (data) => {
	return apiClient.get("dashboard/bookmarks/", {
		params: { ...data },
	});
};

export const getFollowers = (data) => {
	return apiClient.get("dashboard/followers/", {
		params: { ...data },
	});
};

export const getFollowing = (data) => {
	return apiClient.get("dashboard/following/", {
		params: { ...data },
	});
};

export const getBlockList = (data) => {
	return apiClient.get("dashboard/block-list/", {
		params: { ...data },
	});
};

export const getCardData = () => {
	return apiClient.get("dashboard/card-data/");
};

export const getEngagementData = (data) => {
	return apiClient.get("dashboard/engagement-data/", {
		params: { ...data },
	});
};

export const getFollowersData = (data) => {
	return apiClient.get("dashboard/followers-data/", {
		params: { ...data },
	});
};
