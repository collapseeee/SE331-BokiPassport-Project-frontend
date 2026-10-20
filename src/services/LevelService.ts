import { apiMockClient } from "./apiClient"

export default {
  getLevels() {
    return apiMockClient.get('/levels')
  },
  getLevelUsers(level: number) {
    return apiMockClient.get(`/levels/${level}?_embed=users`)
  },
  getLevelBenefitsByUserLevelId(level: number) {
    return apiMockClient.get(`/levels/${level}?_embed=benefits`)
  }
}