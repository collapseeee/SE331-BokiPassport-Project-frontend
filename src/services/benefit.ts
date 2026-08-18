import axios from "axios"

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
    }
})

export default {
    getBenefits(levelId: number) {
        return apiClient.get('benefit?levelId=' + levelId)
    },
    addBenefit(levelId: number) {
        return apiClient.post('benefit', {
            description: '',
            levelId: levelId
        })
    }
}