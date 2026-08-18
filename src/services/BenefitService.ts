import { apiClient } from "./apiClient"

export default {
  getBenefits() {
    return apiClient.get('/benefit')
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