import { apiMockClient } from "./apiClient"

export default {
  getServices() {
    return apiMockClient.get('/services')
  },
}