<script lang="ts" setup>
import type { Level, Service, Benefit } from '@/types.ts';
import CardContainer from './CardContainer.vue';
import Button from '../Button.vue';
import { computed } from 'vue';

const props = defineProps<{
    service: Service
    level: Level
    benefits: Benefit[]
    userLevel: number
}>();

const isLocked = computed(() => props.userLevel >= props.level.id);
</script>
<template>
    <CardContainer class="px-6! py-10!">
        <div class="flex flex-col items-center px-4 gap-y-0.5 w-full">
            <h1 class="font-medium!">{{ props.service.name }}</h1>
            <p class="mb-2 font-medium">{{ props.level.description }}</p>
            <Button label="Use This Service" class="w-full" :locked="isLocked"/>
        </div>
        <hr class="bg-brand-black w-full">
        <div class="flex flex-col w-full">
            <p class="font-bold">Benefits:</p>
            <ul class="list-disc pl-6">
                <li v-for="benefit in benefits" :key="benefit.id">
                    {{ benefit.description }}
                </li>
            </ul>
        </div>
    </CardContainer>
</template>