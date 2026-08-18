import { apiClient } from "./apiClient"

export default {
  getBenefits() {
    return apiClient.get('/benefit')
  },
}