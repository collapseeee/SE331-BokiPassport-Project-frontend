import { defineStore } from 'pinia'
import type { Benefit, BenefitsState } from '@/types'

export const useBenefitsStore = defineStore('benefit', {
  state: (): BenefitsState => ({
    benefits: [],
  }),
  getters: {
    getBenefitsByLevelId: (state) => {
      return (levelId: number) => state.benefits.filter((b) => b.level_id == levelId)
    }
  },
  actions: {
    updateBenefits(benefits: Benefit[]): void {
      this.benefits = benefits
    }
  }
})
