<script lang="ts" setup>
import AdminHeader from '@/components/AdminHeader.vue';
import LevelCard from '@/components/cards/LevelCard.vue';
import LevelService from '@/services/LevelService';
import type { Level } from '@/types';
import { onMounted, ref, watchEffect } from 'vue';

const levels = ref<Level[] | null>(null)
onMounted(() => {
    watchEffect(() => {
        LevelService.getLevels()
            .then(res => levels.value = res.data)
    })
})
</script>

<template>
    <AdminHeader title="Level Management" description="Boki Passport level management system"/>
    <div class="p-5 flex flex-col gap-2">
        <div v-if="levels" class="grid grid-cols-2 gap-3">
            <LevelCard v-for="level in levels" :key="level.id" :level="level"/>
        </div>
        <h1 class=" text-brand-navy-blue" v-else>Loading...</h1>
    </div>
</template>
