<script setup lang="ts">
import type { Badge } from '@/types';
import { Brain } from '@lucide/vue';
import IconCard from '../cards/IconCard.vue';

defineProps<{
    badge: Badge
}>()
</script>

<template>
    <IconCard
        :icon="Brain"
        :title="badge.name || 'Foo'"
        :description="badge.description || 'Bar'"
        :iconSize="'sm'"
        :iconColor="'brand-red'"
        class="p-6!"
    />
</template>