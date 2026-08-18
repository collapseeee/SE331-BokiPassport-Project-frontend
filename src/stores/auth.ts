import { defineStore } from 'pinia';
import { useUserStore } from './user';
import { ref } from 'vue';
import type { User } from '@/types';
import api from '@/services/api';

export const useAuthStore = defineStore('auth', () => {
    const userStore = useUserStore()
    function login(username: string, password: string) {
            const matchedUser = ref<User | null>(null)
            return api.getUsers()
                .then(res => {
                    matchedUser.value = res.data.find((u: User) => u.username === username && u.password === password)
                    if (!matchedUser.value) {
                        return { success: false, error: 'Invalid username or password' }
                    }

                    userStore.saveUser(matchedUser.value)
                    return { success: true, user: matchedUser.value }
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