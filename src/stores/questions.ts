import { defineStore } from 'pinia'
import type { Question, QuestionsState } from '@/types'

export const useQuestionStore = defineStore('questions', {
  state: (): QuestionsState => ({
    questions: [],
  }),
  getters: {
    getQuestionById: (state) => {
      return (questionId: number) => state.questions.find((q) => q.id == questionId);
    }
  },
  actions: {
    updateQuestions(questions: Question[]): void {
      this.questions = questions
    },
    clearQuestion(): void {
      this.questions = []
    }
  }
})
