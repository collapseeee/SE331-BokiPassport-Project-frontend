import { apiClient } from "./apiClient"

export default {
    getUsers() {
        return apiClient.get('/user')
    },
}