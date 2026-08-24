import { apiClient } from "./apiClient"

export default {
    getBadges() {
        return apiClient.get('badges')
    },
    getBadgeById(id: number) {
        return apiClient.get(`badges/${id}`)
    },
    getBadgesByUserId(id: number) {
        return apiClient.get(`users/${id}?_embed=userBadges`)
    }
}