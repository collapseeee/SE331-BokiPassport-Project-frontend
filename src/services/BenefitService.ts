import { apiClient } from "./apiClient"

export default {
  getBenefits() {
    return apiClient.get('/benefits')
  },
  getBenefitsByLevelId(levelId: number) {
    return apiClient.get(`/levels/${levelId}?_embed=benefits`)
  },
  addBenefit(levelId: number) {
    return apiClient.post('/benefits', {
      description: '',
      levelId: levelId
    })
  },
}