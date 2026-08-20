import { apiClient } from "./apiClient"

export default {
  getBenefits() {
    return apiClient.get('/benefits')
  },
  getBenefitsByLevelId(levelId: number) {
    return apiClient.get('benefit?levelId=' + levelId)
  },
  addBenefit(levelId: number) {
    return apiClient.post('benefit', {
      description: '',
      levelId: levelId
    })
  },
}