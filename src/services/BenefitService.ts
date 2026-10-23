import { apiClient, apiMockClient } from "./apiClient"

export default {
  getBenefits() {
    return apiMockClient.get('/benefits')
  },
  getBenefitsByLevel(level: number) {
    return apiClient.get('/v1/benefits?level=' + level)
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