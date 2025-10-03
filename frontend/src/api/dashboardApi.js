import apiClient from "@/api/apiClient.js";

export const getPosts = ({ page = 1, query = "" }) => {
	return apiClient.get("dashboard/posts/", {
		params: { page: page, query: query },
	});
};
