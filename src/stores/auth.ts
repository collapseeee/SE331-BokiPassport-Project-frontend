import { defineStore } from 'pinia';
import { ref } from 'vue';
import type  { User } from '@/types';
import type { ApiUser } from '@/services/api'
import { mapApiUserToUser } from '@/services/mapUser'
import { fetchUsers } from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
    const currentUser = ref<User | null>(null)
    const isAuthenticated = ref(false)

    // Make sure User didn't logout when refresh the page
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
        currentUser.value = JSON.parse(savedUser)
        isAuthenticated.value = true
    }

    async function login(username: string, password: string): Promise<{success: boolean, error?: string}> {
        try {
            const users: ApiUser[] = await fetchUsers()
            const matched = users.find((u) => u.username === username && u.password === password)
            
            if (!matched) {
                return { success: false, error: 'Invalid username or password' }
            }

            const user = mapApiUserToUser(matched)
            currentUser.value = user
            isAuthenticated.value = true
            localStorage.setItem('currentUser', JSON.stringify(user))
            return { success: true }
        } catch (error) {
            return { success: false, error: 'An error occurred while logging in' }
        }
    }

    function logout() {
        currentUser.value = null
        isAuthenticated.value = false
        localStorage.removeItem('currentUser')
    }

    return { currentUser, isAuthenticated, login, logout }
})