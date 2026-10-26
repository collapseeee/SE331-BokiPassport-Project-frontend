<script lang="ts" setup>
import type { Badge, Benefit, Exam } from '@/types';
import { useLevelsStore } from '@/stores/levels.ts';
import CardContainer from './CardContainer.vue';
import Button from '../Button.vue';
import { ref, computed, onMounted } from 'vue';
import { useBenefitsStore } from '@/stores/benefits.ts';
import { Brain } from '@lucide/vue';
import SubCardContainer from './SubCardContainer.vue';
import { useAuthStore } from '@/stores/auth.ts';
import BadgeService from '@/services/BadgeService.ts';

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

const authStore = useAuthStore();
const isAdmin = authStore.isAdmin;
const level = levelStore.getLevelById(Number(props.exam.level.id) + 1)!;
const badge = ref<Badge | null>(null)
levelName.value = level.name;
benefits.value = benefitStore.getBenefitsByLevelId(Number(props.exam.level.id) + 1)!;

if (isAdmin) {
    // Admin user
    buttonLabel.value = 'Edit Exam';
    isDisable.value = false;
} else if (props.exam.level.id < props.userLevel) {
    // Level less than user's level
    isDisable.value = true;
    buttonLabel.value = 'Already Mastered This Level';
} else if (props.exam.level.id == props.userLevel) {
    // Level equal to user's level
    buttonLabel.value = 'Master This Level';
} else {
    // Level greater than user's level
    isLocked.value = true;
}

const buttonTarget = computed(() => {
    if (isAdmin) {
        return { name: 'AdminExamManagementEdit', params: { id: String(props.exam.id) } };
    }
    return { name: 'ExamView', params: { id: String(props.exam.id) } };
});

const colorClass: Record<number, string> = {
    2: 'brand-blue',
    3: 'brand-navy-blue',
    4: 'brand-red'
}

onMounted(() => {
    BadgeService.getBadgeById(props.exam.level.id + 2)
        .then(res => badge.value = res.data)
})

</script>
<template>
    <CardContainer class="px-6! py-10!">
        <div class="flex flex-col items-center px-4 gap-y-0.5 w-full">
            <h1 class="font-medium! text-center mb-2">{{ levelName }}</h1>
            <p class="mb-2.5 font-medium text-center">{{ props.exam.name }}</p>
            <div class="w-full">
                <Button :label="buttonLabel" :disabled="isDisable" :locked="isLocked" :to="buttonTarget"/>
            </div>
        </div>
        <hr class="bg-brand-black w-full">
        <div class="flex flex-col w-full">
            <p class="font-bold">Benefits on Level {{ Number(props.exam.level.id) + 1 }}:</p>
            <ul class="list-disc pl-6">
                <li v-for="benefit in benefits" :key="benefit.id">{{ benefit.description }}</li>
            </ul>
        </div>
        <div class="grid grid-cols-1 xl:grid-cols-2 w-full items-center mt-auto h-fit px-auto gap-8">
            <SubCardContainer>
                <template #default>
                    <p class="font-bold">Pass Criteria:</p>
                    <h1 class="text-6xl!" :class="`text-${colorClass[Number(props.exam.level.id) + 1]}`">{{ Math.round((Number(level.passCriteria)) * 100) }}%</h1>
                    <p class="text-gray-800 pt-2">Correct Answer</p>
                </template>
            </SubCardContainer>
            <SubCardContainer>
                <template #default>
                    <p class="font-bold">Earn Badge:</p>
                    <div class="mx-auto">
                        <Brain class="size-20" :class="`text-${colorClass[Number(props.exam.level.id) + 1]}`"/>
                    </div>
                    <p class="text-center">{{ badge?.name }}</p>
                </template>
            </SubCardContainer>
        </div>
    </CardContainer>
</template>