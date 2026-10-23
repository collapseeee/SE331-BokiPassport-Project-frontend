import { apiClient } from "./apiClient";

apiClient.interceptors.request.use(
    req => {
        const token = localStorage.getItem('AUTH_TOKEN')
        if (token) {
            req.headers['Authorization'] = `Bearer ${JSON.parse(token).accessToken}`
        }
        return req
    },
    err => {
        return Promise.reject(err)
    }
)