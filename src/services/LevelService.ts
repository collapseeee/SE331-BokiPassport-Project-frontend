import { apiClient } from "./apiClient"

export default {
  getLevels() {
    return apiClient.get('/v1/levels')
  },
  getLevelUsers(level: number) {
    return apiClient.get(`/v1/users?level=${level}&role=user`)
  },
  getLevelBenefitsByUserLevelId(level: number) {
    return apiClient.get(`/v1/benefits?level=${level}`)
  }
}