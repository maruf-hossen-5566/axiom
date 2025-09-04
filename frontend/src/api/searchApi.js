import apiClient from "@/api/apiClient.js";

export const search_data = (data) => {
    return apiClient.post("search/", data);
};