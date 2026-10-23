import { apiClient } from "./apiClient"

export default {
    getQuestions() {
        return apiClient.get(`/v1/questions?_embed=answerChoices`)
    },
    getQuestionsByExamId(examId: number) {
      return apiClient.get(`/v1/questions?examId=${examId}`)
    }
}