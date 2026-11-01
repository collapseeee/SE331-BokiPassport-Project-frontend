import { apiClient } from "./apiClient"

export default {
    getBadges() {
        return apiClient.get('/v1/badges')
    },
    getBadgeById(id: number) {
        return apiClient.get(`/v1/badges/${id}`)
    },
    getBadgesByUserId(id: number) {
        return apiClient.get(`/v1/badges/users/${id}`)
    }
}