import type { UserResponse } from "@/types"
import { apiClient } from "./apiClient"

export default {
    getUsers() {
        return apiClient.get('/users?_embed=userLevels')
            .then((res) => {
                res.data = res.data.map((user: UserResponse) => ({
                    ...user,
                    userLevels: user.userLevels[0]
                }))
                return res
            })
            .catch((err) => {
                console.error("Error occurs while get data: ", err)
            })
    },
}