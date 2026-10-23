import type { Question } from "@/types"
import { apiMockClient } from "./apiClient"

export default {
    getQuestions() {
        return apiMockClient.get(`/questions?_embed=answerChoices`)
    },
    getQuestionsByExamId(examId: number) {
        return apiMockClient.get(`/questions?_embed=answerChoices`)
        .then((res) => {
          return res.data.filter((question: Question) => String(question.exam) === String(examId))
        })
        .catch((err) => {
          console.error("Error occurs while get data: ", err)
        })
      }
}