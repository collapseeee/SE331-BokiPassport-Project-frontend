import type { User, UserResponse, UserSearchOption } from "@/types"
import { apiClient, apiMockClient } from "./apiClient"

export default {
    getMockUsers() {
        /* This will get UserResponse interface first, then map it to User interface.
        * If calls this for further usage in here must map it to User interface.
        */
        return apiMockClient.get('/users?_embed=userLevels')
            .then((res) => {
                return res.data.map((user: UserResponse) => ({
                    ...user,
                    userLevels: user.userLevels[0]
                }))
            })
            .catch((err) => {
                console.error("Error occurs while get data: ", err)
            })
    },
    getUsers(pageSize: number, page: number, searchOption: UserSearchOption) {
       return apiClient.get('/v1/users?_limit=' + pageSize + '&_page=' + page + '&name=' + searchOption.name + '&province=' + searchOption.province + '&level=' + searchOption.level)
    },
    getUser(id: number) {
        return apiMockClient.get(`users/${id}`)
    },
    getUserUsers() {
        return apiMockClient.get('/users?_embed=userLevels&role=user')
            .then((res) => {
                return res.data.map((user: UserResponse) => ({
                    ...user,
                    userLevels: user.userLevels[0]
                }))
            })
            .catch((err) => {
                console.error("Error occurs while get data: ", err)
            })
    },
    getPaginatedUser(page: number) {
        return apiMockClient.get(`/users?_embed=userLevels&role=user&_limit=5&_page=${page}`)
            .then(res => {
                const users = res.data.map((user: UserResponse) => ({
                    ...user,
                    userLevels: user.userLevels[0]
                }))
                return { users }
            })
    },
    getUserExams(id: number) {
        return apiMockClient.get(`/users/${id}?_embed=userExamHistories`)
    },
    getPaginatedUserExams(id: number, page: number) {
        return apiMockClient.get(`/userExamHistories?userId=${id}&_page=${page}&_limit=5`)
    },
    getUserByLevelId(levelId: number) {
        return this.getMockUsers()
            .then((res) => {
                return res.filter((user: User) => {
                    return Number(user.userLevels.levelId) === levelId && user.role === 'user'
                })
            })
    },
    getAdmins() {
        return this.getMockUsers()
            .then((res) => {
                return res.filter((user: User) => {
                    return user.role === 'admin'
                })
            })
    },
    getActiveUsers() {
        return this.getMockUsers()
            .then((res) => {
                return res.filter((user: User) => {
                    return user.isActive === true && user.role === 'user'
                })
            })
    }
}