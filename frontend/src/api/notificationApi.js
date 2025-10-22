import apiClient from "@/api/apiClient.js";

export const getNotifications = () => {
    return apiClient.get("notification/");
};