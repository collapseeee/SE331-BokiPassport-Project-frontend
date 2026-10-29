import type { Question } from "@/types"
import { apiClient } from "./apiClient"

export default {
    getQuestionsByExamId(examId: number) {
      return apiClient.get(`/v1/exams/${examId}/questions`)
    },
    getQuestionWithAnswerKey(examId: number) {
      return apiClient.get(`/v1/exams/${examId}/questionsWithKey`)
    },
    saveQuestions(examId: number, questions: Question[]) {
      return apiClient.put(`/v1/exams/${examId}/questions`, questions)
    },
}