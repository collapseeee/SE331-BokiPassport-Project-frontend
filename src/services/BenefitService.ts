import type { BenefitPayload } from "@/types"
import { apiClient } from "./apiClient"

export default {
  getBenefits() {
    return apiClient.get('/v1/benefits')
  },
  getBenefitsByLevel(level: number) {
    return apiClient.get('/v1/benefits?level=' + level)
  },
  saveBenefits(levelId: number, benefits: BenefitPayload[]) {
    return apiClient.put(`/v1/levels/${levelId}/benefits`, benefits)
  },
  deleteBenefits(benefitIds: number[]) {
    return apiClient.delete('/v1/levels/benefits', { data: benefitIds })
  },
  deleteBenefit(benefitId: number) {
    return apiClient.delete(`/v1/levels/benefits/${benefitId}`)
  }
}