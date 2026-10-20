import { defineStore } from 'pinia';
import { useUserStore } from './user';
import { ref, watch, computed } from 'vue';
import type { User } from '@/types';
import UserService from '@/services/UserService';
import SecurityService, { type RegisterRequest } from '@/services/SecurityService';

const TOKEN_KEY = "AUTH_TOKEN";

// Rehydrate token on store creation
const storedToken = localStorage.getItem(TOKEN_KEY);

export const useAuthStore = defineStore('auth', () => {
    const userStore = useUserStore();

    // Token state — persisted so refresh doesn't log out
    const token = ref<string | null>(storedToken);

    // Persist token to localStorage
    watch(token, (val) => {
        if (val) {
            localStorage.setItem(TOKEN_KEY, val);
        } else {
            localStorage.removeItem(TOKEN_KEY);
        }
    });

    // Role derived from user store
    const role = computed(() => userStore.role);

    // Auth check based on token presence
    const isAuthenticated = computed(() => token.value !== null);

    function register(firstName: string, lastName: string, username: string, password: string, province: string, image: string) {
        return SecurityService.register({
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            province: province,
            image: image
        } as RegisterRequest)
            .then(res => {
                userStore.saveUser(res.data)
            })
    }

    function login(username: string, password: string) {
        // TODO(backend): replace with real auth call — POST /auth/login
        // Expected response: { token: string, user: User }
        // For now using mock json-server pattern
        return UserService.getUsers()
            .then(res => {
                const matchedUser = res.find((u: User) => u.username === username && u.password === password);
                if (!matchedUser) {
                    return { success: false, error: 'Invalid username or password' };
                }

                // TODO(backend): use real token from response instead of placeholder
                token.value = `mock-token-${matchedUser.id}`;
                userStore.saveUser(matchedUser);
                return { success: true, user: matchedUser };
            })
            .catch((err) => {
                console.error('API error during login: ', err);
                return { success: false, error: 'An error occurred while logging in', user: null };
            });
    }

    function logout() {
        token.value = null;
        userStore.clearUser();
    }

    return { token, role, isAuthenticated, register, login, logout };
});
