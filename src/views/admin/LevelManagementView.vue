<script lang="ts" setup>
import LevelCard from '@/components/cards/LevelCard.vue';
import level from '@/services/level';
import type { Level } from '@/types';
import { onMounted, ref, watchEffect } from 'vue';

const levels = ref<Level[] | null>(null)
onMounted(() => {
    watchEffect(() => {
        level.getLevels()
            .then(res => levels.value = res.data)
    })
})
</script>

<template>
    <div class="p-5 flex flex-col gap-2">
        <h2>Level Management</h2>
        <p>Boki Passport level management system</p>
        <div v-if="levels" class="grid grid-cols-2 gap-3">
            <LevelCard v-for="level in levels" :key="level.id" :level="level"/>
        </div>
        <h1 class=" text-brand-navy-blue" v-else>Loading...</h1>
    </div>
</template>
