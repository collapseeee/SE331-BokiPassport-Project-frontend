import { apiMockClient } from "./ApiClient"

export default {
    getBadges() {
        return apiMockClient.get('badges')
    },
    getBadgeById(id: number) {
        return apiMockClient.get(`badges/${id}`)
    },
    getBadgesByUserId(id: number) {
        return apiMockClient.get(`users/${id}?_embed=userBadges`)
    }
}