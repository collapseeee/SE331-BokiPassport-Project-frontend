import { apiClient } from "./apiClient"

export default {
  getLevels() {
    return apiClient.get('/v1/levels')
  }
}