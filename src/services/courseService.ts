import { apiClient } from "./apiClient"

export default {
    getCourses() {
        return apiClient.get('course')
    },
    getCourse(id: number) {
        return apiClient.get('course/' + id)
    }
}