import axios from "axios"

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
    }
})

export default {
    getCourses() {
        return apiClient.get('course')
    },
    getCourse(id: number) {
        return apiClient.get('course/' + id)
    }
}