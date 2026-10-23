import { apiClient } from "./apiClient"

export default {
  getBenefits() {
    return apiClient.get('/v1/benefits')
  },
  getBenefitsByLevelId(levelId: number) {
    return apiClient.get(`/v1/benefits?level=${levelId}`)
  },
  addBenefit(levelId: number) {
    return apiClient.post('/v1/benefits', {
      description: '',
      levelId: levelId
    })
  },
}