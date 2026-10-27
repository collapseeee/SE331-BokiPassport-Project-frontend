import type { User, UserSearchOption } from "@/types"
import { apiClient } from "./apiClient"

export default {
    getUsers(pageSize: number, page: number, searchOption: UserSearchOption) {
       return apiClient.get('/v1/users?_limit=' + pageSize + '&_page=' + page + '&search=' + searchOption.name + '&province=' + searchOption.province + '&level=' + searchOption.level)
    },
    getUser(id: number) {
        return apiClient.get('/v1/users/' + id)
    },
    getExamHistories(id: number, page: number) {
        return apiClient.get(`/v1/exams/users/${id}?_page=${page}&_limit=5`)
    },
    getUserByLevelId(levelId: number) {
        return this.getUsers(100, 1, { name: '', province: '', level: String(levelId) })
        .then((res) => {
            return res.data.filter((user: User) => !user.roles.includes('ROLE_ADMIN') && Number(Math.max(...user.levels.map(l => l.id))) === levelId)
        })
    },
    getAdmin() {
        return this.getUsers(100, 1, { name: '', province: '', level: '' })
        .then((res) => {
            return res.data.filter((user: User) => user.roles.includes('ROLE_ADMIN'))
        })
    },
    getActiveUsers() {
        return this.getUsers(100, 1, { name: '', province: '', level: '' })
        .then((res) => {
            return res.data.filter((user: User) => user.isActive && !user.roles.includes('ROLE_ADMIN'))
        })
    },
     getProvinces() {
        return apiClient.get('/v1/users/provinces')
    },
    async updateUserImage(imageUrl: string) {
        const { data } = await apiClient.put('/v1/users/me', { image: imageUrl })
        return data
    },
    updateUserBadge(badgeId: number) {
        return apiClient.patch('/v1/users/me/badges/' + badgeId)
    }
}