import { apiMockClient } from "./apiClient"

export default {
    getQuestions() {
        return apiMockClient.get(`/questions?_embed=answerChoices`)
    },
    getQuestionsByExamId(examId: number) {
      return apiMockClient.get(`/questions?examId=${examId}`)
    }
}