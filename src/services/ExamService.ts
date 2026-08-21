import { apiClient } from "./apiClient"

export default {
  getExams() {
    return apiClient.get('/exams')
  },
  getExam(id: number) {
    return apiClient.get(`/exams/${id}`)
  }
}