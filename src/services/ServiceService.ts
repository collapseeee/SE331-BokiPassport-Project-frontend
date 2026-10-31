import type { Service } from "@/types"
import { apiClient } from "./apiClient"

export default {
  getServices() {
    return apiClient.get('/v1/services')
  },
  getServiceByLevelId(levelId: number) {
    return apiClient.get(`/v1/services/level/${levelId}`)
  },
  saveServices(levelId: number, services: Service[]) {
    return apiClient.put(`v1/levels/${levelId}/services`, services)
  },
  deleteServices(serviceIds: number[]) {
    return apiClient.delete('/v1/levels/services', { data: serviceIds} )
  },
  deleteService(serviceId: number) {
    return apiClient.delete(`/v1/levels/services/${serviceId}`)
  }
}