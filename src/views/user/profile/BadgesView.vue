<script lang="ts" setup>
import Container from '@/components/Container.vue';
import BadgeUnlockModal from '@/components/modal/BadgeUnlockModal.vue';
import NotFoundText from '@/components/NotFoundText.vue';
import UserBadge from '@/components/profile/UserBadge.vue';
import UserService from '@/services/UserService';
import { useBadgesStore } from '@/stores/badges';
import type { Badge } from '@/types';
import { onMounted, ref } from 'vue';
const badgesStore = useBadgesStore()
const isModalOpen = ref<boolean>(false)
const badges = ref<Badge[] | null>(null)
onMounted(() => {
    if (!badgesStore.isEarned(1)) {
        UserService.updateUserBadge(1)
            .then(res => {
                isModalOpen.value = true
                badgesStore.badges = res.data.badges
            })
    }
    badges.value = badgesStore.badges
})
</script>
<template>
    <BadgeUnlockModal v-model="isModalOpen"/>
    <Container title="Badges">
        <div v-if="badges && badges.length > 0" class="grid grid-cols-6 w-full h-full gap-4 p-4">
            <UserBadge v-for="badge in badges" :badge="badge" :key="badge.id" />
        </div>
        <NotFoundText v-else text="No badge unlocked yet!"/>
    </Container>
</template>