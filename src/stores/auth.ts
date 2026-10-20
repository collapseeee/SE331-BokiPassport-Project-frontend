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

// The access token is a JWT — the level claim lives inside it.
function decodeToken(accessToken: string): Record<string, unknown> | null {
    const payload = accessToken.split('.')[1];
    if (!payload) return null;
    try {
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(atob(base64));
    } catch {
        return null;
    }
}

export const useAuthStore = defineStore('auth', () => {
    // Token state — persisted so refresh doesn't log out
    const token = ref<AuthToken | null>(readStored<AuthToken>(TOKEN_KEY));

    // TODO(backend): the real backend sends `image` + `roles`, the json-server
    // mock sends `imageUrl` + `role`. Collapse to one shape when the mock login
    // is replaced by the real /v1/auth/authenticate.
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
    const level = computed(() => {
        const claims = token.value?.accessToken ? decodeToken(token.value.accessToken) : null;
        const claim = claims?.levelId ?? claims?.level;
        if (claim != null) return Number(claim);
        // mock login path: the json-server user carries its level
        const mockLevel = user.value?.userLevels?.levelId;
        return mockLevel != null ? Number(mockLevel) : null;
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

    // TODO(backend): for a real session the level comes from the access token,
    // so a level-up only applies after the backend issues a new token.
    function updateUserLevel(levelId: number) {
        if (user.value?.userLevels) {
            user.value = { ...user.value, userLevels: { ...user.value.userLevels, levelId } };
        }
    }

    return { token, user, isAuthenticated, id, fullName, image, role, level, register, login, logout, updateUserLevel };
});
