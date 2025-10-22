import apiClient from "@/api/apiClient.js";

export const signupApi = (data) => {
    return apiClient.post("auth/signup/", data);
};

export const loginApi = (data) => {
    return apiClient.post("auth/login/", data);
};

export const updateProfile = (data) => {
    return apiClient.post("auth/update/", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const changePassword = (data) => {
    return apiClient.post("auth/change-password/", data)
}

export const deleteAccount = () => {
    return apiClient.delete("auth/delete/")
}