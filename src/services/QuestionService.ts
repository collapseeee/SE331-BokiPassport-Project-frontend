import { apiClient } from "./apiClient"

export default {
    getQuestionsByExamId(examId: number) {
      return apiClient.get(`/v1/exams/${examId}/questions`)
    },
    getQuestionWithAnswerKey(examId: number) {
      return apiClient.get(`/v1/exams/${examId}/questionsWithKey`)
    },
}