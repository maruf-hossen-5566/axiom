import apiClient from "@/api/apiClient.js";

export const getProfile = (data) => {
	return apiClient.get("profile/get_profile/", { params: data });
};

export const follow = (data) => {
	return apiClient.post("profile/follow/", data);
};

export const blockProfile = () => {
	return apiClient.post("profile/block/", data);
};
