<script lang="ts" setup>
import type { Benefit, Service } from '@/types.ts';
import { useLevelsStore } from '@/stores/levels';
import { useBenefitsStore } from '@/stores/benefits';
import CardContainer from './CardContainer.vue';
import Button from '../Button.vue';
import { computed, ref } from 'vue';

const props = defineProps<{
    service: Service
    userLevel: number
}>();

const levelsStore = useLevelsStore();
const levelName = ref('Level X');
const levelDescription = ref('-');

const benefitsStore = useBenefitsStore();
const benefits = ref<Benefit[]>([]);

const level = levelsStore.getLevelById(Number(props.service.levelId))!;
levelName.value = level.name;
levelDescription.value = level.description;
benefits.value = benefitsStore.getBenefitsByLevelId(Number(props.service.levelId));
const isLocked = computed(() => props.userLevel < props.service.levelId);
</script>
<template>
    <CardContainer class="px-6! py-10! justify-start">
        <div class="flex flex-col items-center px-4 gap-y-0.5 w-full">
            <h1 class="font-medium!">{{ props.service.name }}</h1>
            <p class="mb-2 font-medium">{{ levelDescription }}</p>
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