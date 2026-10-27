import type { Badge, BadgeStates } from "@/types";
import { defineStore } from "pinia";

export const useBadgesStore = defineStore('badge', {
    state: (): BadgeStates => ({
        badges: []
    }),
    actions: {
        updateBadges(badges: Badge[]) {
            this.badges = badges
        },
        isEarned(badgeId: number): boolean {
            return this.badges.some(badge => badge.id === badgeId)
        }
    }
})