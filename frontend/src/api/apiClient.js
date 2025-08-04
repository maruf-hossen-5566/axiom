import axios from 'axios';
import {getTokens} from "@/utils/token.js";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/', // timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const [access] = getTokens()
    if (access) {
        config.headers.Authorization = `Bearer ${access}`
    }
    return config
}, (error) => {
    return Promise.reject((error))
})

export default apiClient;
