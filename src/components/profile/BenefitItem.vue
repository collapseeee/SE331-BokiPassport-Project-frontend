<script setup lang="ts">
import type { Benefit } from '@/types';
import { CircleCheck, CircleMinus } from '@lucide/vue';

defineProps<{
    isEligible: boolean,
    benefit: Benefit
}>()

const textClass = 'text-md w-full'
</script>

<template>
    <div class="flex  gap-x-3 py-1">
        <CircleCheck v-if="isEligible" class="text-brand-green size-6"/>
        <CircleMinus v-else class="text-brand-red"/>
        <p :class="[{ 'text-mist-600': !isEligible }, textClass]">{{ benefit.description }}</p>
    </div>
</template>