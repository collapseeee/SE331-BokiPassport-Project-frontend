<script setup lang="ts">
import Button from '@/components/Button.vue';
import FormRadio from '@/components/form/FormRadio.vue';
import { useQuestionStore } from '@/stores/questions';
import type { AnswerChoice } from '@/types';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';

const emit = defineEmits<{
    (e: 'submit', answers: Record<number, number>): void
}>();

const questionStore = useQuestionStore();
const { questions } = storeToRefs(questionStore);

const questionIndex = ref<number>(0);
const selectedAnswers = ref<Record<number, AnswerChoice>>({});

const currentQuestion = computed(() => questions.value[questionIndex.value]);

const handlePreviousButton = () => {
    if (questionIndex.value > 0) {
        questionIndex.value--;
    }
};

const handleNextButton = () => {
    if (questionIndex.value < questions.value.length - 1) {
        questionIndex.value++;
    }
};

const isAnsweredAll = () => {
    return questions.value.every((question) => {
        return Boolean(selectedAnswers.value[question.id]);
    });
};

const sumitAnswers = () => {
    if (!isAnsweredAll()) {
        alert("Please answer all questions before submit!");
        return;
    }
    const answers: Record<number, number> = {};
    for (const [questionId, choice] of Object.entries(selectedAnswers.value)) {
        answers[Number(questionId)] = choice.id;
    }
    emit('submit', answers);
};
</script>

<template>
    <div class="flex flex-col gap-8">
        <FormRadio 
            v-if="currentQuestion"
            :key="currentQuestion.id" 
            :label="currentQuestion.questionText" 
            :question-index="questionIndex + 1" 
            :choices="currentQuestion.answerChoices"
            v-model="selectedAnswers[currentQuestion.id]"
        />
        <div class="flex flex-row justify-between">
            <Button 
                v-if="questionIndex > 0" 
                label="Previous" 
                left-arrow 
                bg-color="brand-gray" 
                text-color="brand-black" 
                @click="handlePreviousButton"
            />
            <div class="ml-auto">
                <Button 
                    v-if="questionIndex < questions.length - 1" 
                    label="Next" 
                    right-arrow 
                    @click="handleNextButton"
                />
                <Button 
                    v-else 
                    label="Submit" 
                    right-arrow
                    bg-color="brand-green"
                    @click="sumitAnswers"
                />
            </div>
        </div>
    </div>
</template>