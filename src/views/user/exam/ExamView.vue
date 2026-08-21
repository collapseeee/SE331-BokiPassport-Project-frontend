<script lang="ts" setup>
import ExamResultModal from '@/components/modal/ExamResultModal.vue';
import router from '@/router';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const timeLimitInSecond = 600;
const timeLeft = ref(timeLimitInSecond);
let timer: ReturnType<typeof setInterval> | undefined;

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});

onMounted(() => {
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
        timeLeft.value -= 1;
    } else {
        clearInterval(timer);
        router.push({ name: 'ExamList'})
    }
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<template>
    <ExamResultModal
        :total-score="3"
        :max-score="5"
        :is-passed="false"
    />
    <div class="flex flex-col py-16 px-32">
        <div class="flex flex-row justify-between">
            <div>
                <h2>Level X Examination</h2>
                <p>Question 1 of 10</p>
            </div>
            <p>Time limit: {{ formattedTime }}</p>
        </div>
    </div>
</template>
