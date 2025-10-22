import apiClient from "@/api/apiClient.js";

export const getTagsOnPostSubmit = (data) => {
    return apiClient.post(`tags/submit/`, data);
};

export const getTags = (params) => {
    return apiClient.get(`tags/`, {
        params: {...params},
    });
};

export const getTag = (slug, params) => {
    return apiClient.get(`tags/${slug}/`, {
        params: {...params},
    });
};

export const addTag = (data) => {
    return apiClient.post("tags/add/", data);
};
