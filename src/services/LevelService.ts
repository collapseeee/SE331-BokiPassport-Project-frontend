import { apiClient } from "./apiClient"

export default {
  getLevels() {
    return apiClient.get('/levels')
  },
}