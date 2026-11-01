<script lang="ts" setup>
import AdminHeader from '@/components/AdminHeader.vue';
import Button from '@/components/Button.vue';
import { ref, reactive, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ExamDetailForm from '@/components/ExamDetailForm.vue';
import QuestionBuilder from '@/components/QuestionBuilder.vue';
import QuestionService from '@/services/QuestionService';
import type { Exam, Question, QuestionPayload } from '@/types';
import ExamService from '@/services/ExamService';
import PostOperationModal from '@/components/modal/PostOperationModal.vue';


const loading = ref<boolean>(false);

const isModalOpen = ref(false);
const isSuccess = ref(true);
const operationMsg = ref('Exam Update');
const successMsg = ref('');

const currentQuestion = computed(() => questions.value[currentIndex.value]);
const router = useRouter();
const route = useRoute();
const AdminExamManagement = 'AdminExamManagement';
const examId = route.params.id as string;
const examFormRef = ref()
const examFormValid = computed(() => examFormRef.value?.isValid ?? false)
const areAllQuestionsValid = computed(() => {
    if (questions.value.length === 0) return false;
    return questions.value.every((q) => {
        const hasText = Boolean(q.questionText?.trim());
        const hasAtLeastTwoChoices = q.answerChoices && q.answerChoices.length >= 2;
        const choicesFilled = q.answerChoices.every((c) => Boolean(c.answerText?.trim()));
        const hasOneCorrect = q.answerChoices.some((c) => Boolean(c.isCorrect));
        return hasText && hasAtLeastTwoChoices && choicesFilled && hasOneCorrect;
    });
});
const allValid = computed(() => examFormValid.value && areAllQuestionsValid.value);

// Pull data to store temporary for editing
const examMeta = reactive<{ name: string; description: string; levelId: number | null }>({
    name: '',
    description: '',
    levelId: null,
});

const questions = ref<Question[]>([]);
const currentIndex = ref<number>(0);


const newTempId = () => -(Date.now());
onMounted(async () => {
    try{
        const examRes = await ExamService.getExamById(Number(examId));
        const exam = examRes.data;
        examMeta.name = exam.name;
        examMeta.description = exam.description;
        examMeta.levelId = exam.level.id;

        const fetchedQuestions = await QuestionService.getQuestionWithAnswerKey(Number(examId));
        questions.value = structuredClone(fetchedQuestions.data ?? []);
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

const goPrevious = () => {
    if (currentIndex.value > 0) currentIndex.value--;
};
 
const goNext = () => {
    if (currentIndex.value < questions.value.length - 1) currentIndex.value++;
};

const handleCancel = () => {
    router.push({ name: AdminExamManagement });
};

const deletedQuestionIds = ref<number[]>([]);
const handleDeleteQuestion = () => {
    const question = questions.value[currentIndex.value];
    if (question && question.id > 0) {
        deletedQuestionIds.value.push(question.id);
    }
    questions.value.splice(currentIndex.value, 1);
    if (currentIndex.value >= questions.value.length) {
        currentIndex.value = Math.max(0, questions.value.length - 1);
    }
};

const handleSave = async () => {
    if (!allValid.value) return;

    try {
        if (deletedQuestionIds.value.length > 0) {
            await QuestionService.deleteQuestions(deletedQuestionIds.value);
            deletedQuestionIds.value = [];
        }

        const questionsPayload: QuestionPayload[] = questions.value.map((q) => ({
            id: q.id && q.id > 0 ? q.id : null,
            questionText: q.questionText,
            answerChoices: q.answerChoices.map((c) => ({
                id: c.id && c.id > 0 ? c.id : null,
                answerText: c.answerText,
                isCorrect: Boolean(c.isCorrect ?? false),
            })),
        }));

        await ExamService.saveExam(Number(examId), {
            id: Number(examId),
            name: examMeta.name,
            description: examMeta.description,
            level: { id: examMeta.levelId }, // Only 
            questionCount: questions.value.length,
        } as Exam);

        await QuestionService.saveQuestions(Number(examId), questionsPayload);

        isSuccess.value = true;
        operationMsg.value = 'Exam Update';
        successMsg.value = `${examMeta.name} updated successfully.`;
        isModalOpen.value = true;
    } catch (error) {
        console.error('Failed to save exam: ', error);
        isSuccess.value = false;
        operationMsg.value = 'Exam Update';
        isModalOpen.value = true;
    }
};
</script>

<template>
    <div class="bg-brand-white min-h-screen">
        <PostOperationModal
            v-model="isModalOpen" 
            :operationMsg="operationMsg" 
            :success="isSuccess" 
            :successMsg="successMsg" 
            :close-modal-router-push="{ name: 'AdminExamManagement' }"
        />

        <div v-if="loading" class="flex items-center justify-center py-16">
            <p class="text-brand-white">Loading exam...</p>
        </div>
        
        <div v-else class="flex flex-col gap-y-2 p-12">
            <div class="flex items-center justify-between">
                <AdminHeader class="pl-0!" title="Edit Exam" description=""/>
                <div class="flex gap-3">
                    <Button label="Cancel" bg-color="brand-gray" text-color="brand-black" @click="handleCancel" />
                    <Button label="Save" :disabled="!allValid" @click="handleSave" />
                </div>
            </div>
        

            <!-- Exam Details -->
            
            <ExamDetailForm ref="examFormRef" v-model="examMeta" />

            <!-- Question Builder -->
            <div class="flex flex-col gap-y-2.5 border bg-brand-black border-brand-gray rounded-xl p-8">
                <div class="flex items-center justify-between">
                    <h3 class="text-brand-white">Question Builder</h3>
                    <Button
                        type="button"
                        @click="addQuestion"
                        label="+ Add question"
                    />
                </div>

                <QuestionBuilder
                    ref="questionFormRef"
                    v-if="currentQuestion"
                    :key="currentQuestion.id"
                    v-model="currentQuestion"
                    :question-number="currentIndex + 1"
                    @delete-question="handleDeleteQuestion"
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