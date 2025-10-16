import apiClient from "@/api/apiClient.js";

export const searchData = (data) => {
	return apiClient.post("search/", data);
};

export const searchPosts = (data) => {
	return apiClient.get("search/posts/", {
		params: { ...data },
	});
};

export const searchUsers = (data) => {
	return apiClient.get("search/users/", {
		params: { ...data },
	});
};

export const searchTags = (data) => {
	return apiClient.get("search/tags/", {
		params: { ...data },
	});
};
