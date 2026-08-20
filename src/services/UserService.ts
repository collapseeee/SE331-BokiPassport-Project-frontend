import { apiClient } from "./apiClient"

export default {
    getUsers() {
        return apiClient.get('/users')
    },
    getUserExams(id: number) {
        return apiClient.get(`/users/${id}?_embed=userExamHistories`)
    }
}