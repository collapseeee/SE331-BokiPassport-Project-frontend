<script lang="ts" setup>
import type { Component } from 'vue';
import type { DashboardItem } from '@/types';
import SubCardContainer from './SubCardContainer.vue';

const props = defineProps<{
    icon: Component
    header: DashboardItem
    value: DashboardItem[]
}>();
</script>
<template>
    <div class="border border-gray-300 rounded-xl shadow-lg bg-brand-white p-4 gap-4">
        <div class="flex flex-col sm:flex-row items-center justify-between">
            <div class="flex flex-row items-center">
                <component :is="props.icon" class="text-brand-blue" />
                <h4 class="ml-2">{{ props.header.key }}</h4>
            </div>
            <h2>{{ props.header.value }}</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <SubCardContainer v-for="item in value" :key="item.key" class="border border-gray-200">
                <div class="w-full">
                    <p class="flex justify-start">{{ item.key }}:</p>
                    <h2 class="flex justify-end">{{ item.value }}</h2>
                </div>
            </SubCardContainer>
        </div>
    </div>
</template>