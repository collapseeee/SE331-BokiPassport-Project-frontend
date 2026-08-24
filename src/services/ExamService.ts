import type { Exam } from "@/types"
import { apiClient } from "./apiClient"

export default {
  getExams() {
    return apiClient.get('/exams?_embed=questions')
  },
  getExamById(id: number) {
    return apiClient.get(`/exams?_embed=questions`)
    .then((res) => {
      return res.data.find((exam: Exam) => String(exam.id) === String(id))
    })
    .catch((err) => {
      console.error("Error occurs while get data: ", err)
    })
  }
}