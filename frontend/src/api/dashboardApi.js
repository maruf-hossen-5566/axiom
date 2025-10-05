import apiClient from "@/api/apiClient.js";

export const getPosts = ({
	page = 1,
	query = "",
	sort = "most-engagement",
}) => {
	return apiClient.get("dashboard/posts/", {
		params: { page: page, query: query, sort: sort },
	});
};

export const getBookmarks = ({ page = 1, query = "" }) => {
	return apiClient.get("dashboard/bookmarks/", {
		params: { page: page, query: query },
	});
};

// export const getFollowers = ({ page = 1, query = "" }) => {
export const getFollowers = (data) => {
	return apiClient.get("dashboard/followers/", {
		params: { ...data },
	});
};

export const getFollowing = ({ page = 1, query = "" }) => {
	return apiClient.get("dashboard/following/", {
		params: { page: page, query: query },
	});
};
