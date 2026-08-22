<script lang="ts" setup>
import SubCardContainer from '@/components/cards/SubCardContainer.vue';
import ExamResultModal from '@/components/modal/ExamResultModal.vue';
import { useExamStore } from '@/stores/exam';
import { useLevelsStore } from '@/stores/levels';
import { storeToRefs } from 'pinia';
import { ref, computed, onBeforeUnmount } from 'vue';
import { Brain } from '@lucide/vue';
import Button from '@/components/Button.vue';

const timeLimitInSecond = 600; // Unit = Second.
const isModalOpen = ref<boolean>(false);

let timer: ReturnType<typeof setInterval> | undefined;
const timeLeft = ref<number>(timeLimitInSecond);

const formattedTime = computed(() => {
    const minutes = Math.floor(timeLeft.value / 60);
    const seconds = timeLeft.value % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});

const startTimer = () => {
    if (timer) {
        clearInterval(timer);
    }
    timer = setInterval(() => {
        if (timeLeft.value > 0) {
            timeLeft.value -= 1;
        } else {
            stopTimer();
            isModalOpen.value = true;
        }
    }, 1000);
};

const stopTimer = () => {
    if (timer) {
        timeLeft.value = timeLimitInSecond;
        clearInterval(timer);
        timer = undefined;
    }
};

const handleSubmit = () => {
    stopTimer();
    isModalOpen.value = true;
};

onBeforeUnmount(() => {
    stopTimer();
});

const examStore = useExamStore();
const levelStore = useLevelsStore();
const { exam } = storeToRefs(examStore);
const level = computed(() => levelStore.getLevelById(Number(exam.value!.levelId) + 1));
const passCriteria = computed(() => Number(level.value!.passCriteria));
const questionLength = computed(() => exam.value!.questions.length);

const colorClass: Record<number, string> = {
    2: 'brand-blue',
    3: 'brand-navy-blue',
    4: 'brand-red'
}
</script>

<template>
    <ExamResultModal
        :total-score="3"
        :max-score="5"
        :is-passed="false"
        v-model="isModalOpen"
    />
    <div class="flex flex-col py-16 px-32">
        <div class="flex flex-row justify-between mb-8">
            <div class="text-start flex flex-col">
                <h2>{{ level!.name }} Examination</h2>
                <p class="font-semibold">{{ exam!.description }}</p>
                
            </div>
            <div class="text-end flex flex-col justify-between">
                <p class="font-medium text-xl">{{ exam!.name }}</p>
                <p v-if="timer" class="font-medium">Timer: {{ formattedTime }}</p>
            </div>
        </div>
        <div v-if="$route.name !== 'ExamQuestionView'" class="grid grid-cols-4 gap-2">
            <SubCardContainer class="col-span-4 lg:col-span-1">
                <template #default>
                    <p class="font-bold">Pass Criteria:</p>
                    <h1 class="text-6xl!" :class="`text-${colorClass[Number(exam!.levelId) + 1]}`">{{ Math.round(passCriteria * 100) }}%</h1>
                    <p class="text-gray-800 pt-2">Correct Answer</p>
                </template>
            </SubCardContainer>
            <SubCardContainer class="col-span-4 lg:col-span-3">
                <template #default>
                    <p class="font-bold">Duration:</p>
                    <h1 class="text-6xl! my-auto">{{ Math.floor(timeLimitInSecond / 60) }} Minutes</h1>
                    <p class="text-gray-800 pt-2 text-center">Once the time is up, the system will automatically submit your answers.</p>
                </template>
            </SubCardContainer>
            <SubCardContainer class="col-span-4 lg:col-span-1">
                <template #default>
                    <p class="font-bold">Earn Badge:</p>
                    <div class="mx-auto">
                        <Brain class="size-20" :class="`text-${colorClass[Number(exam!.levelId) + 1]}`"/>
                    </div>
                    <p>foo</p>
                </template>
            </SubCardContainer>
            <SubCardContainer class="col-span-4 lg:col-span-3">
                <template #default>
                    <p class="font-bold">Questions:</p>
                    <h1 class="text-6xl! my-auto">{{ questionLength }}</h1>
                    <p class="text-gray-800 pt-2 text-center">You need at least {{ Math.round(passCriteria * questionLength) }} correct answers to pass this examination.</p>
                </template>
            </SubCardContainer>
            <div class="col-span-4 justify-self-center py-4">
                <Button label="Take examination" right-arrow @click="startTimer" :to="{ name: 'ExamQuestionView' }"/>
            </div>
        </div>
        <div v-else>
            <RouterView @submit="handleSubmit" />
        </div>
    </div>
</template>
