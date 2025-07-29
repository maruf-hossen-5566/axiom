import apiClient from "@/api/apiClient.js";

export const signup = (data) => {
    return apiClient.post("auth/signup/", data)
}