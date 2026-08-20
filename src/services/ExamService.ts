import { apiClient } from "./apiClient"

export default {
  getExams() {
    return apiClient.get('/exams')
  },
}