import apiClient from "@/api/apiClient.js";

export const getProfile = ({username, params}) => {
    return apiClient.get(`profile/get_profile/${username}/`, {
        params: {...params}
    });
};

export const follow = (data) => {
    return apiClient.post("profile/follow/", data);
};

export const blockProfile = (data) => {
    return apiClient.post("profile/block/", data);
};
