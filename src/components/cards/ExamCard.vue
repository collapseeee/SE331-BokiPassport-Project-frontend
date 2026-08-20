<script lang="ts" setup>
import type { Benefit, Exam } from '@/types';
import { useLevelsStore } from '@/stores/levels.ts';
import CardContainer from './CardContainer.vue';
import Button from '../Button.vue';
import { ref } from 'vue';
import { useBenefitsStore } from '@/stores/benefits.ts';
import { Brain } from '@lucide/vue';

const props = defineProps<{
    exam: Exam
    userLevel: number
}>();

const levelStore = useLevelsStore();
const levelName = ref('Level X');
const buttonLabel = ref('-');
const isLocked = ref(false);
const isDisable = ref(false);

const benefitStore = useBenefitsStore();
const benefits = ref<Benefit[]>([]);

const level = levelStore.getLevelById(Number(props.exam.levelId) + 1)!;
levelName.value = level.name;
benefits.value = benefitStore.getBenefitsByLevelId(Number(props.exam.levelId) + 1)!;

if (props.exam.levelId < props.userLevel) {
    // Level less than user's level
    isDisable.value = true;
    buttonLabel.value = 'Already Mastered This Level';
} else if (props.exam.levelId == props.userLevel) {
    // Level equal to user's level
    buttonLabel.value = 'Master This Level';
} else {
    // Level greater than user's level
    isLocked.value = true;
}

const colorClass: Record<number, string> = {
    2: 'brand-blue',
    3: 'brand-navy-blue',
    4: 'brand-red'
}

</script>
<template>
    <CardContainer class="px-6! py-10!">
        <div class="flex flex-col items-center px-4 gap-y-0.5 w-full">
            <h1 class="font-medium! text-center mb-2">{{ levelName }}</h1>
            <p class="mb-2.5 font-medium text-center">{{ props.exam.name }}</p>
            <Button :label="buttonLabel" class="w-full" :disabled="isDisable" :locked="isLocked" :to="{ name: 'ExamView', params: { id: String(props.exam.id) } }"/>
        </div>
        <hr class="bg-brand-black w-full">
        <div class="flex flex-col w-full">
            <p class="font-bold">Benefits on Level {{ Number(props.exam.levelId) + 1 }}:</p>
            <ul class="list-disc pl-6">
                <li v-for="benefit in benefits" :key="benefit.id">{{ benefit.description }}</li>
            </ul>
        </div>
        <div class="grid grid-cols-1 xl:grid-cols-2 w-full items-center mt-auto h-fit px-auto gap-8">
            <div class="bg-brand-white rounded-2xl p-4 text-start shadow-xl flex flex-col items-center w-full h-full">
                <p class="font-bold">Pass Criteria:</p>
                <h1 class="text-6xl!" :class="`text-${colorClass[Number(props.exam.levelId) + 1]}`">{{ Math.round((Number(level.passCriteria)) * 100) }}%</h1>
                <p class="text-gray-800 pt-2">Correct Answer</p>
            </div>
            <div class="bg-brand-white rounded-2xl p-4 text-center shadow-xl flex flex-col justify-between w-full h-full">
                <p class="font-bold">Earn Badge:</p>
                <div class=" mx-auto">
                    <Brain class="size-20" :class="`text-${colorClass[Number(props.exam.levelId) + 1]}`"/>
                </div>
                <p>foo</p>
            </div>
        </div>
    </CardContainer>
</template>