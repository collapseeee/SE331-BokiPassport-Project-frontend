<script lang="ts" setup>
import SubCardContainer from '@/components/cards/SubCardContainer.vue';
import ExamResultModal from '@/components/modal/ExamResultModal.vue';
import { useExamStore } from '@/stores/exam';
import { useLevelsStore } from '@/stores/levels';
import { storeToRefs } from 'pinia';
import { ref, computed, onBeforeUnmount } from 'vue';
import { Brain } from '@lucide/vue';
import Button from '@/components/Button.vue';
import { useAuthStore } from '@/stores/auth';
import ExamService from '@/services/ExamService';
import UserService from '@/services/UserService';

const authStore = useAuthStore();
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

const userScore = ref<number>(0);

onBeforeUnmount(() => {
    stopTimer();
});

const examStore = useExamStore();
const levelStore = useLevelsStore();
const { exam } = storeToRefs(examStore);
const level = computed(() => levelStore.getLevelById(Number(exam.value!.level.id) + 1));
const questionLength = ref<number>(exam.value?.questionCount ?? 0);
const passCriteria = computed(() => Number(level.value?.passCriteria ?? 0));
const isPassed = ref<boolean>(false);

const passMark = computed(() => Math.round(passCriteria.value * questionLength.value));
const passPercent = computed(() => 
    questionLength.value > 0 
        ? Math.round((passMark.value / questionLength.value) * 100) 
        : 0
);


const handleSubmit = async (answers: Record<number, number>) => {
    stopTimer();
    const { data } = await ExamService.submit(exam.value!.id, answers);
    userScore.value = data.totalScore;
    questionLength.value = data.maxScore;
    isPassed.value = data.isPassed;
    if (data.awardedLevelId && authStore.id !== null) {
        const { data: profileRes } = await UserService.getUser(authStore.id);
        authStore.user = profileRes;
    }
    isModalOpen.value = true;

};

const colorClass: Record<number, string> = {
    2: 'brand-blue',
    3: 'brand-navy-blue',
    4: 'brand-red'
}
</script>

<template>
    <ExamResultModal
        :total-score="userScore"
        :max-score="questionLength"
        :is-passed="isPassed"
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
                    <h1 class="text-6xl!" :class="`text-${colorClass[Number(exam!.level.id) + 1]}`">{{ passMark }} / {{ questionLength }} ({{ passPercent }}%)</h1>
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
                        <Brain class="size-20" :class="`text-${colorClass[Number(exam!.level.id) + 1]}`"/>
                    </div>
                    <p>foo</p>
                </template>
            </SubCardContainer>
            <SubCardContainer class="col-span-4 lg:col-span-3">
                <template #default>
                    <p class="font-bold">Questions:</p>
                    <h1 class="text-6xl! my-auto">{{ questionLength }}</h1>
                    <p class="text-gray-800 pt-2 text-center">You need at least {{ passMark }} correct answers to pass this examination.</p>
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
