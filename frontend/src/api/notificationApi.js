import apiClient from "@/api/apiClient.js";

export const getNotifications = (params) => {
    return apiClient.get("notification/all/", {
        params: {...params}
    });
};

export const deleteNotifications = (data) => {
    return apiClient.post("notification/delete/", data)
}