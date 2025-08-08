import apiClient from "@/api/apiClient.js";

export const getComments = () => {
	return apiClient.get("comments/");
};

export const addComment = (data) => {
	return apiClient.post("comments/add/", data);
};

export const deleteComment = (data) => {
	return apiClient.post("comments/delete/", data);
};
