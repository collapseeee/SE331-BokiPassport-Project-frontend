<script setup lang="ts">
import type { Benefit } from '@/types';
import { CircleCheck, CircleMinus } from '@lucide/vue';

defineProps<{
    isEligible: boolean,
    benefit?: Benefit
}>()

const textClass = 'text-md'
</script>

<template>
    <div class="flex items-start gap-x-3 py-1">
        <CircleCheck v-if="isEligible" class="text-green-700"/>
        <CircleMinus v-else class="text-red-700"/>
        <p :class="[{ 'text-mist-600': !isEligible }, textClass]">{{ benefit?.description }}</p>
    </div>
</template>