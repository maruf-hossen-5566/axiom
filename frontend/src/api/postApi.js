import apiClient from "@/api/apiClient.js";

export const getPosts = () => {
	return apiClient.get("posts/");
};

export const getPostDetail = (author, slug) => {
	return apiClient.get(`posts/${author}/${slug}/`);
};

export const addPost = (data) => {
	return apiClient.post("posts/add/", data);
};

export const deletePost = (data) => {
	return apiClient.post("posts/delete/", data);
};

export const addThumbnail = (data) => {
	return apiClient.post("posts/add/thumbnail/", data, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};

export const deleteThumbnail = (data) => {
	return apiClient.post("posts/delete/thumbnail/", data);
};

export const getTags = () => {
	return apiClient.get("tag/get/");
};

export const checkLiked = (data) => {
	return apiClient.post("posts/check-like/", data);
};

export const likePost = (data) => {
	return apiClient.post("posts/like/", data);
};

export const moreFromAuthor = (data) => {
	return apiClient.get("posts/more-from-author/", { params: data });
};

export const moreToRead = (data) => {
	return apiClient.get("posts/more-to-read/", { params: data });
};
