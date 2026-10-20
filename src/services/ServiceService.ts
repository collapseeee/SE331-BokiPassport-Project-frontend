import { apiMockClient } from "./ApiClient"

export default {
  getServices() {
    return apiMockClient.get('/services')
  },
}