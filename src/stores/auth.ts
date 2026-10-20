import { defineStore } from 'pinia';
import { ref, watch, computed } from 'vue';
import axios from 'axios';
import type { AuthToken, Profile, User } from '@/types';
import UserService from '@/services/UserService';
import SecurityService, { type RegisterRequest, type RegisterResponse } from '@/services/SecurityService';

const TOKEN_KEY = "AUTH_TOKEN";
const USER_KEY = "USER_STATE";

export interface LoginResult {
    success: boolean
    error?: string
    user?: Profile
}

function readStored<T>(key: string): T | null {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
        return JSON.parse(raw) as T;
    } catch {
        // stale value from the pre-merge store (the token used to be a bare string)
        localStorage.removeItem(key);
        return null;
    }
}

export const useAuthStore = defineStore('auth', () => {
    // Token state — persisted so refresh doesn't log out
    const token = ref<AuthToken | null>(readStored<AuthToken>(TOKEN_KEY));

    // TODO(backend): the real backend sends `image` + `roles` + `levels`, the
    // json-server mock sends `imageUrl` + `role` + `userLevels`. Collapse to one
    // shape when the mock login is replaced by the real /v1/auth/authenticate.
    const user = ref<Profile | null>(readStored<Profile>(USER_KEY));

    // Persist token to localStorage
    watch(token, (val) => {
        if (val) {
            localStorage.setItem(TOKEN_KEY, JSON.stringify(val));
        } else {
            localStorage.removeItem(TOKEN_KEY);
        }
    });

    // Persist profile to localStorage
    watch(user, (val) => {
        if (val) {
            localStorage.setItem(USER_KEY, JSON.stringify(val));
        } else {
            localStorage.removeItem(USER_KEY);
        }
    }, { deep: true });

    // Getters derive from reactive state (not localStorage)
    const isAuthenticated = computed(() => !!token.value?.accessToken);
    const id = computed(() => user.value?.id ?? null);
    const fullName = computed(() => user.value ? `${user.value.firstName} ${user.value.lastName}` : "");
    const image = computed(() => user.value?.image ?? user.value?.imageUrl ?? "");
    const role = computed(() => {
        const roles = user.value?.roles;
        if (roles?.length) {
            return roles.some(r => r.toUpperCase().includes("ADMIN")) ? "ADMIN" : "USER";
        }
        return user.value?.role?.toUpperCase() ?? "";
    });
    const isAdmin = computed(() => role.value === "ADMIN");
    const isUser = computed(() => role.value === "USER");
    const level = computed(() => {
        // the backend sends the levels the user unlocked
        const levels = user.value?.levels ?? [];
        if (levels.length) return Math.max(...levels.map(l => l.id));
        // mock login path: the json-server user carries a single level record
        const mockLevel = user.value?.userLevels?.levelId;
        if (mockLevel != null) return Number(mockLevel);
        return 1;
    });

    async function register(request: RegisterRequest): Promise<RegisterResponse> {
        try {
            const { data } = await SecurityService.register(request);
            token.value = { accessToken: data.accessToken, refreshToken: data.refreshToken };
            user.value = data.profile;
            return data;
        } catch (err) {
            const body = axios.isAxiosError(err) ? err.response?.data : null;
            throw new Error(body?.message ?? body?.error ?? "Registration failed. Please try again.");
        }
    }

    async function login(username: string, password: string): Promise<LoginResult> {
        try {
            const users = await UserService.getUsers();
            const matchedUser = users.find((u: User) => u.username === username && u.password === password);
            if (!matchedUser) {
                return { success: false, error: "Invalid username or password" };
            }
            // keep the mock user without its plaintext password
            const safeUser: Profile = {
                id: matchedUser.id,
                firstName: matchedUser.firstName,
                lastName: matchedUser.lastName,
                province: matchedUser.province,
                imageUrl: matchedUser.imageUrl,
                username: matchedUser.username,
                role: matchedUser.role,
                isActive: matchedUser.isActive,
                levelId: matchedUser.levelId,
                userLevels: matchedUser.userLevels,
            };
            // TODO(backend): replace with the real POST /v1/auth/authenticate
            token.value = { accessToken: `mock-token-${matchedUser.id}`, refreshToken: "" };
            user.value = safeUser;
            return { success: true, user: safeUser };
        } catch (err) {
            console.error("API error during login: ", err);
            return { success: false, error: "An error occurred while logging in" };
        }
    }

    function logout() {
        token.value = null;
        user.value = null;
    }

    // TODO(backend): for a real session the level comes from the profile's
    // `levels`, so a level-up only applies after the profile is refetched.
    function updateUserLevel(levelId: number) {
        if (user.value?.userLevels) {
            user.value = { ...user.value, userLevels: { ...user.value.userLevels, levelId } };
        }
    }

    return { token, user, isAuthenticated, id, fullName, image, role, isAdmin, isUser, level, register, login, logout, updateUserLevel };
});
