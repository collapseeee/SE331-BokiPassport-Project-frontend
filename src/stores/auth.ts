import { defineStore } from 'pinia';
import type { ApiUser } from '@/services/api'
import { mapApiUserToUser } from '@/services/mapUser'
import { fetchUsers } from '@/services/api'
import { useUserStore } from './user';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const userStore = useUserStore()
    function login(username: string, password: string) {
            const matched = ref<ApiUser | null>(null)
            return fetchUsers()
                .then(res => {
                    matched.value = res.data.find((u: ApiUser) => u.username === username && u.password === password)
                    if (!matched.value) {
                        return { success: false, error: 'Invalid username or password' }
                    }

                    const user = mapApiUserToUser(matched.value)
                    userStore.saveUser(user)
                    return { success: true, user: user }
                })
                .catch(() => {
                    return { success: false, error: 'An error occurred while logging in', user: null }
                })
    }

    function isAuthenticated(): boolean {
        return userStore.isStored
    }

    function logout() {
        userStore.user = null
        userStore.clearUser()
    }

    return { isAuthenticated, login, logout }
})