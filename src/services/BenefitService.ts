import { apiClient } from "./apiClient"

export default {
  getBenefits() {
    return apiClient.get('/v1/benefits')
  },
  getBenefitsByLevel(level: number) {
    return apiClient.get('/v1/benefits?level=' + level)
  },
  addBenefit(levelId: number) {
    return apiClient.post('/v1/benefits', {
      description: '',
      levelId: levelId
    })
  },
}