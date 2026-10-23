import { apiClient } from "./apiClient"

export default {
    getQuestionsByExamId(examId: number) {
      return apiClient.get(`/v1/questions?examId=${examId}`)
    },
    getQuestionWithAnswerKey(examId: number) {
      return apiClient.get(`/v1/admin/exams/${examId}/questions`)
    }
}