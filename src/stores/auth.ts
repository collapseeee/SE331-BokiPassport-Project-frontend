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

    async function authenticate(request: AuthenticateRequest): Promise<LoginResult> {
        try {
            const { data } = await SecurityService.authenticate(request)
            token.value = { accessToken: data.accessToken, refreshToken: data.refreshToken }
            user.value = data.profile
            console.log(data)
            return { success: true, user: data.profile };
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

    return { token, user, isAuthenticated, id, fullName, image, role, isAdmin, isUser, level, register, authenticate, logout, updateUserLevel };
});
