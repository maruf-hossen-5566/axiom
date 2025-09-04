import apiClient from "@/api/apiClient.js";

export const getProfile = (data) => {
	return apiClient.post("profile/get_profile/", data);
};

export const follow = (data) => {
	return apiClient.post("profile/follow/", data);
};

export const blockProfile = (data) => {
	return apiClient.post("profile/block/", data);
};
