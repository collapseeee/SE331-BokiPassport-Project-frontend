import { apiClient } from "./apiClient"

export default {
    getCourses() {
        return apiClient.get('courses')
    },
    getCourse(id: number) {
        return apiClient.get('courses/' + id)
    }
}