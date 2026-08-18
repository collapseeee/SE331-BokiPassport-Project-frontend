import { defineStore } from 'pinia'
import type { Level, LevelsState } from '@/types'

export const useLevelsStore = defineStore('level', {
  state: (): LevelsState => ({
    levels: [],
  }),
  getters: {
    getLevelById: (state) => {
        return (levelId: number) => state.levels.find((l) => l.id == levelId);
    },
  },
  actions: {
    updateLevels(levels: Level[]): void {
      this.levels = levels
    }
  }
})
