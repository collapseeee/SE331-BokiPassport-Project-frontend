import { apiClient } from "./apiClient"

export default {
  getLevels() {
    return apiClient.get('/levels')
  },
  getLevelUsers(level: number) {
    return apiClient.get(`/levels/${level}?_embed=users`)
  },
  getLevelBenefitsByUserLevelId(level: number) {
    return apiClient.get(`/levels/${level}?_embed=benefits`)
  }
}