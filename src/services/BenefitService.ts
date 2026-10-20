import { apiMockClient } from "./apiClient"

export default {
  getBenefits() {
    return apiMockClient.get('/benefits')
  },
  getBenefitsByLevelId(levelId: number) {
    return apiMockClient.get(`/levels/${levelId}?_embed=benefits`)
  },
  addBenefit(levelId: number) {
    return apiMockClient.post('/benefits', {
      description: '',
      levelId: levelId
    })
  },
}