import apiClient from "@/api/apiClient.js";

export const getPostTags = (data) => {
	return apiClient.get("tags/", data);
};

export const addTag = (data) => {
	return apiClient.post("tags/add/", data);
};
