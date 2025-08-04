import apiClient from "@/api/apiClient.js";

export const addThumbnail = (data) => {
    return apiClient.post("posts/add/thumbnail/", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export const deleteThumbnail = (data) => {
    return apiClient.post("posts/delete/thumbnail/", data)
}

export const addPost = (data) => {
    return apiClient.post("posts/add/", data)
}

export const deletePost = (data) => {
    return apiClient.post("posts/delete/", data)
}

export const getTags = () => {
    return apiClient.get("tag/get")
}