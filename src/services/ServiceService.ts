import { apiClient } from "./apiClient"

export default {
  getServices() {
    return apiClient.get('/service')
  },
}