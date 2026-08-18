import { type User, type UserState } from "@/types";
import { defineStore } from "pinia";

const userKey = 'USER_STATE'

export const useUserStore = defineStore('user', ({
    state: (): UserState => ({
        user: null
    }),
    getters: {
        role(): string {
            return localStorage.getItem(userKey) ? JSON.parse(localStorage.getItem(userKey) || '').role.toUpperCase() : ''
        },
        imageUrl(): string {
            return localStorage.getItem(userKey) ? JSON.parse(localStorage.getItem(userKey) || '').imageUrl : ''
        },
        fullName(): string {
            return JSON.parse(localStorage.getItem(userKey) || '').firstName + ' ' +  JSON.parse(localStorage.getItem(userKey) || '').lastName
        },
        level(): string {
            return localStorage.getItem(userKey) ? JSON.parse(localStorage.getItem(userKey) || '').level : ''
        },
        isStored(): boolean {
            return localStorage.getItem(userKey) ? true : false
        }
    },
    actions: {
        saveUser(user: User) {
            /* Save user state to localStorage */
            localStorage.setItem(userKey, JSON.stringify({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                province: user.province,
                imageUrl: user.imageUrl,
                role: user.role
            }))
        },
        clearUser() {
            localStorage.removeItem(userKey)
        }
    }
}))