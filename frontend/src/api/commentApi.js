import apiClient from "@/api/apiClient.js";

export const getComments = (data) => {
	return apiClient.get("comments/", { params: data });
};

export const addComment = (data) => {
	return apiClient.post("comments/add/", data);
};

export const updateComment = (data) => {
	return apiClient.put("comments/add/", data);
};

export const deleteComment = (data) => {
	return apiClient.post("comments/delete/", data);
};
