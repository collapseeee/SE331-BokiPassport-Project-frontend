import { apiClient } from "./apiClient"

export default {
  getExams() {
    return apiClient.get('/v1/exams')
  },
  getExamById(id: number) {
    return apiClient.get(`/v1/exams/${id}`)
  }
}