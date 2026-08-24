import type { User, UserResponse } from "@/types"
import { apiClient } from "./apiClient"

export default {
    getUsers() {
        /* This will get UserResponse interface first, then map it to User interface.
        * If calls this for further usage in here must map it to User interface.
        */
        return apiClient.get('/users?_embed=userLevels')
            .then((res) => {
                console.log(res.data)
                return res.data.map((user: UserResponse) => ({
                    ...user,
                    userLevels: user.userLevels[0]
                }))
            })
            .catch((err) => {
                console.error("Error occurs while get data: ", err)
            })
    },
    getUser(id: number) {
        return apiClient.get(`users/${id}`)
    },
    getPaginatedUser(page: number) {
        return apiClient.get(`/users?_embed=userLevels&role=user&_limit=5&_page=${page}`)
            .then(res => {
                const users = res.data.map((user: UserResponse) => ({
                    ...user,
                    userLevels: user.userLevels[0]
                }))
                return { users, totalItems: res.data.items }
            })
    },
    getUserExams(id: number) {
        return apiClient.get(`/users/${id}?_embed=userExamHistories`)
    },
    getPaginatedUserExams(id: number, page: number) {
        return apiClient.get(`/userExamHistories?userId=${id}&_page=${page}&_limit=5`)
    },
    getUserByLevelId(levelId: number) {
        return this.getUsers()
            .then((res) => {
                return res.filter((user: User) => {
                    return Number(user.userLevels.levelId) === levelId && user.role === 'user'
                })
            })
    },
    getAdmins() {
        return this.getUsers()
            .then((res) => {
                return res.filter((user: User) => {
                    return user.role === 'admin'
                })
            })
    },
    getActiveUsers() {
        return this.getUsers()
            .then((res) => {
                return res.filter((user: User) => {
                    return user.isActive === true && user.role === 'user'
                })
            })
    }
}