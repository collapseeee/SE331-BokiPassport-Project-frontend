import type { QuestionPayload } from "@/types"
import { apiClient } from "./apiClient"

export default {
    getQuestionsByExamId(examId: number) {
      return apiClient.get(`/v1/exams/${examId}/questions`)
    },
    getQuestionWithAnswerKey(examId: number) {
      return apiClient.get(`/v1/exams/${examId}/questionsWithKey`)
    },
    saveQuestions(examId: number, questions: QuestionPayload[]) {
      return apiClient.put(`/v1/exams/${examId}/questions`, questions)
    },
    deleteQuestions(questionIds: number[]) {
      return apiClient.delete('/v1/exams/questions', { data: questionIds })
    }
}