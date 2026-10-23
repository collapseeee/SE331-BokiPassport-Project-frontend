<script lang="ts" setup>
import AdminHeader from '@/components/AdminHeader.vue';
import Button from '@/components/Button.vue';
import { ref, reactive, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ExamDetailForm from '@/components/ExamDetailForm.vue';
import QuestionBuilder from '@/components/QuestionBuilder.vue';
import QuestionService from '@/services/QuestionService';
import type { Question } from '@/types';
import ExamService from '@/services/ExamService';


const loading = ref<boolean>(false);

const router = useRouter();
const route = useRoute();
const AdminExamManagement = 'AdminExamManagement';
const examId = route.params.id as string;

// Pull data to store temporary for editing
const examMeta = reactive<{ name: string; description: string; levelId: number | null }>({
    name: '',
    description: '',
    levelId: null,
});

const questions = ref<Question[]>([]);
const currentIndex = ref<number>(0);

const currentQuestion = computed(() => questions.value[currentIndex.value]);

const newTempId = () => -(Date.now() + Math.floor(Math.random() * 1000));
onMounted(async () => {
    try{
        const exam = await ExamService.getExamById(Number(examId));
        examMeta.name = exam.name;
        examMeta.description = exam.description;
        examMeta.levelId = exam.levelId;

        const fetchedQuestions = await QuestionService.getQuestionsByExamId(Number(examId));
        questions.value = structuredClone(fetchedQuestions ?? []);
    } catch (error) {
        console.error('Error fetching exam:', error);
    } finally {
        loading.value = false;
    }
});

const addQuestion = () => {
    const tempQuestionId = newTempId();
    questions.value.push({
        id: tempQuestionId,
        questionText: '',
        answerChoices: [
            { id: newTempId(), answerText: '', isCorrect: true },
            { id: newTempId(), answerText: '', isCorrect: false }
        ]
    });
    currentIndex.value = questions.value.length - 1;
};

const deleteQuestion = () => {
    questions.value.splice(currentIndex.value, 1);
    if (currentIndex.value >= questions.value.length) {
        currentIndex.value = Math.max(0, questions.value.length - 1);
    }
};

const goPrevious = () => {
    if (currentIndex.value > 0) currentIndex.value--;
};
 
const goNext = () => {
    if (currentIndex.value < questions.value.length - 1) currentIndex.value++;
};

const handleCancel = () => {
    router.push({ name: AdminExamManagement });
};

const handleSave = () => {
    // Implement save logic here
    router.push({ name: AdminExamManagement });
};
</script>

<template>
    <div class="bg-brand-white min-h-screen">
        <div v-if="loading" class="flex items-center justify-center py-16">
            <p class="text-brand-white">Loading exam...</p>
        </div>
        
        <div v-else class="flex flex-col gap-16 py-16 px-16">
            <div class="flex items-center justify-between">
                <AdminHeader title="Edit Exam" description="" class="text-brand-blue"/>
                <div class="flex gap-3">
                    <Button label="Cancel" bg-color="brand-gray" text-color="brand-black" @click="handleCancel" />
                    <Button label="Save" @click="handleSave" />
                </div>
            </div>
        

            <!-- Exam Details -->
            
            <ExamDetailForm v-model="examMeta" />

            <!-- Question Builder -->
            <div class="flex flex-col gap-4 border bg-brand-black border-brand-gray rounded-2xl p-8">
                <div class="flex items-center justify-between">
                    <h3 class="text-brand-white">Question Builder</h3>
                    <button
                        type="button"
                        class="text-brand-blue font-semibold text-sm hover:opacity-75 transition"
                        @click="addQuestion"
                    >
                        + Add question
                    </button>
                </div>

                <QuestionBuilder
                    v-if="currentQuestion"
                    :key="currentQuestion.id"
                    v-model="currentQuestion"
                    :question-number="currentIndex + 1"
                    @delete-question="deleteQuestion"
                />

                <p v-else class="text-brand-white text-center py-8">
                        No questions yet. Click "Add question" to start building this exam.
                </p>

                <div v-if="questions.length" class="grid grid-cols-3 items-center">
                    <div class="justify-self-start">
                        <Button
                            v-if="currentIndex > 0"
                            label="Previous"
                            left-arrow
                            bg-color="brand-gray"
                            text-color="brand-black"
                            @click="goPrevious"
                        />
                    </div>
                        <p class="text-brand-white text-sm justify-self-center">
                            Question {{ currentIndex + 1 }} of {{ questions.length }}
                        </p>
                    <div class="justify-self-end">    
                        <Button
                            v-if="currentIndex < questions.length - 1"
                            label="Next"
                            right-arrow
                            @click="goNext"
                        />
                    </div>    
                </div>
            </div>
        </div>
    </div>
</template>