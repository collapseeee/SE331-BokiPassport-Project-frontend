import { defineStore } from 'pinia'
import type { Exam, ExamState } from '@/types'

export const useExamStore = defineStore('exam', {
  state: (): ExamState => ({
    exam: null,
  }),
  actions: {
    updateExam(exam: Exam): void {
      this.exam = exam
    },
    clearExam(): void {
      this.exam = null
    }
  }
})
