import { apiClient } from "./apiClient"

export default {
  getExams() {
    return apiClient.get('/v1/exams')
  },
  getExamById(id: number) {
    return apiClient.get(`/v1/exams/${id}`)
  },
  submit(examId: number, answers: Record<number, number>) {
    return apiClient.post(`/v1/exams/${examId}/submit`, { answers });
  },
}