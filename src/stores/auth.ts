import { defineStore } from 'pinia';
import { ref, watch, computed } from 'vue';
import axios from 'axios';
import type { AuthToken, Profile } from '@/types';
import SecurityService, { type AuthenticateRequest, type RegisterRequest, type RegisterResponse } from '@/services/SecurityService';

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
    const image = computed(() => user.value?.image ?? "");
    const role = computed(() => {
        if (!user.value) return "";
        const roles = user.value.roles;
        if (roles?.length) {
            return roles.some(r => r.toUpperCase().includes("ADMIN")) ? "ADMIN" : "USER";
        }
        // the backend always sends roles — a profile without them is a regular user
        return "USER";
    });
    const isAdmin = computed(() => role.value === "ADMIN");
    const isUser = computed(() => role.value === "USER");
    const level = computed(() => {
        // the backend sends the levels the user unlocked
        const levels = user.value?.levels ?? [];
        return levels.length ? Math.max(...levels.map(l => l.id)) : 1;
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

    async function authenticate(request: AuthenticateRequest): Promise<LoginResult> {
        try {
            const { data } = await SecurityService.authenticate(request)
            token.value = { accessToken: data.accessToken, refreshToken: data.refreshToken }
            user.value = data.profile
            return { success: true, user: data.profile };
        } catch (err) {
            console.error("API error during login: ", err);
            // the backend answers a bad login with 403 "Forbidden" and a stack trace
            if (axios.isAxiosError(err) && err.response?.status === 403) {
                return { success: false, error: "Invalid username or password" };
            }
            const body = axios.isAxiosError(err) ? err.response?.data : null;
            return { success: false, error: body?.message ?? body?.error ?? "An error occurred while logging in" };
        }
    }

    function logout() {
        token.value = null;
        user.value = null;
    }

    // The level comes from the profile, so a level-up only shows up once the
    // backend sends a profile that includes the new level.
    function updateUserLevel(levelId: number) {
        if (!user.value) return;
        const levels = user.value.levels ?? [];
        if (levels.some(l => l.id === levelId)) return;
        user.value = { ...user.value, levels: [...levels, { id: levelId, name: `Level ${levelId}` }] };
    }

    return { token, user, isAuthenticated, id, fullName, image, role, isAdmin, isUser, level, register, authenticate, logout, updateUserLevel };
});
