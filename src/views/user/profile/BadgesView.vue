<script lang="ts" setup>
import Container from '@/components/Container.vue';
import NotFoundText from '@/components/NotFoundText.vue';
import UserBadge from '@/components/profile/UserBadge.vue';
import type { Badge } from '@/types';
defineProps<{
    badges?: Badge[]
}>()
</script>
<template>
    <Container title="Badges">
        <div v-if="badges && badges.length > 0" class="grid grid-cols-6 w-full h-full gap-4 p-4">
            <UserBadge v-for="badge in badges" :badge="badge" :key="badge.id" />
        </div>
        <NotFoundText v-else text="No badge unlocked yet!"/>
    </Container>
</template>