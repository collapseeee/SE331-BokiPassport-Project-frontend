import type { Question } from "@/types"
import { apiClient } from "./apiClient"

export default {
    getQuestions() {
        return apiClient.get(`/questions?_embed=answerChoices`)
    },
    getQuestionsByExamId(examId: number) {
        return apiClient.get(`/questions?_embed=answerChoices`)
        .then((res) => {
          return res.data.filter((question: Question) => String(question.examId) === String(examId))
        })
        .catch((err) => {
          console.error("Error occurs while get data: ", err)
        })
      }
}