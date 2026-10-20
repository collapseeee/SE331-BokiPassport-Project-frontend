import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";
import type { User } from "@/types";

const USER_KEY = "USER_STATE";

// Rehydrate from localStorage on store creation
const stored = localStorage.getItem(USER_KEY);
const initialUser = stored ? JSON.parse(stored) : null;

export const useUserStore = defineStore("user", () => {
    // Reactive state — components reading getters below will now update automatically
    const user = ref<User | null>(initialUser);

    // Persist to localStorage on every change
    watch(user, (val) => {
        if (val) {
            localStorage.setItem(USER_KEY, JSON.stringify(val));
        } else {
            localStorage.removeItem(USER_KEY);
        }
    }, { deep: true });

    // Getters derive from reactive state (not localStorage)
    const object = computed(() => user.value);
    const id = computed(() => user.value?.id ?? null);
    const role = computed(() => user.value?.role.toUpperCase() ?? "");
    const fullName = computed(() => user.value ? `${user.value.firstName} ${user.value.lastName}` : "");
    const level = computed(() => user.value?.userLevels?.levelId ?? null);
    const imageUrl = computed(() => user.value?.imageUrl ?? "");
    const isStored = computed(() => user.value !== null);

    // Actions
    function saveUser(u: User) {
        user.value = u;
    }

    // TODO(backend): called after exam level-up — exam response includes new levelId
    function updateUserLevel(levelId: number) {
        if (user.value) {
            user.value = {
                ...user.value,
                userLevels: { ...user.value.userLevels, levelId },
            };
        }
    }

    function clearUser() {
        user.value = null;
    }

    return { user, object, role, level, fullName, id, imageUrl, isStored, saveUser, updateUserLevel, clearUser };
});
