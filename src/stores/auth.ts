import { defineStore } from 'pinia';
import { useUserStore } from './user';
import { ref } from 'vue';
import type { User } from '@/types';
import UserService from '@/services/UserService';

export const useAuthStore = defineStore('auth', () => {
    const userStore = useUserStore()
    function login(username: string, password: string) {
            const matchedUser = ref<User | null>(null)
            return UserService.getUsers()
                .then(res => {
                    matchedUser.value = res.find((u: User) => u.username === username && u.password === password)
                    if (!matchedUser.value) {
                        return { success: false, error: 'Invalid username or password' }
                    }

                    userStore.saveUser(matchedUser.value)
                    return { success: true, user: matchedUser.value }
                })
                .catch((err) => {
                    console.error('API error during login: ', err)
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