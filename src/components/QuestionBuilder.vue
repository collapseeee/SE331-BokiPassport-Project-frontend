<script lang="ts" setup>
import type { Question } from '@/types';
import FormInput from '@/components/form/FormInput.vue';
import FormRadio from '@/components/form/FormRadio.vue';
import { Plus, Trash2 } from '@lucide/vue';
import { computed, watch } from 'vue';
import * as yup from 'yup';
import { useForm, useIsFormValid } from 'vee-validate';
import FormError from '@/components/form/FormError.vue';

const props = defineProps<{
    questionNumber: number
}>();

const emit = defineEmits<{
    (e: 'delete-question'): void
}>();

const model = defineModel<Question>({ required: true });

const validationSchema = yup.object({
    questionText: yup.string().required('Question text is required.'),
    answerChoices: yup.array()
        .min(2, 'At least 2 answer choices are required.')
        .of(yup.object({
            answerText: yup.string().required('Answer choice text is required.')
        })).required()
});

const { errors, setValues } = useForm({
    validationSchema,
    initialValues: {
        questionText: model.value.questionText,
        answerChoices: model.value.answerChoices
    },
    validateOnMount: true
})

const isValid = useIsFormValid();

watch(() => model.value, (val) => {
    setValues(val);
}, { deep: true });

const hasCorrectChoice = computed(() => 
    model.value.answerChoices.some((c) => c.isCorrect));

defineExpose({
    isValid: computed(() => isValid.value && hasCorrectChoice.value),
    hasCorrectChoice
});

const addChoice = () => {
    const tempId = -(Date.now() + Math.floor(Math.random() * 1000));
    model.value.answerChoices.push({
        id: tempId,
        answerText: '',
        isCorrect: model.value.answerChoices.length === 0,
    });
};

// Requires at least 2 choices to remain
const removeChoice = (choiceId: number) => {
    model.value.answerChoices = model.value.answerChoices.filter((c) => c.id !== choiceId);
};

const correctChoice = computed({
    get: () => model.value.answerChoices.find((c) => c.isCorrect) ?? null,
    set: (choice) => {
        model.value.answerChoices.forEach((c) => {
            c.isCorrect = choice ? c.id === choice.id : false;
        });
    }
});
</script>

<template>
    <div class=" rounded-2xl  flex flex-col gap-y-2">
        <div class="flex items-center justify-between">
            <h5 class="flex items-center justify-center size-12 rounded-md bg-brand-blue text-brand-white text-sm font-bold">
               No. {{ props.questionNumber }}
            </h5>
            <!-- this is for delete unwanted question -->
            <button
                type="button"
                class="text-gray-500 hover:text-brand-red transition shrink-0 mb-2.5"
                title="Delete question"
                @click="emit('delete-question')"
            >
                <Trash2 class="size-8" />
            </button>
        </div>
        <!-- Customize Question -->
        <FormInput
            :id="`question-${model.id}-text`"
            label="Question Text"
            placeholder="Enter your question here..."
            v-model="model.questionText"
            textcolor="text-brand-white"
        />
        <FormError :errors="errors.questionText"/>

        <!-- Answer Choices -->
        <div class="flex flex-col gap-3">
            <div
                v-for="(choice, index) in model.answerChoices"
                :key="choice.id"
                class="flex items-end gap-2 h-22"
            >
                <div class="flex-1">
                    <FormInput
                        :id="`choice-${choice.id}-text`"
                        :label="`Choice ${index + 1}`"
                        placeholder="This is an editable choice"
                        v-model="choice.answerText"
                        textcolor="text-brand-white"
                    />
                    <FormError class="absolute" :errors="errors[`answerChoices[${index}].answerText`]" />
                </div>
                <button
                    v-if="model.answerChoices.length > 2"
                    type="button"
                    class="text-gray-500 hover:text-brand-red transition shrink-0 mb-2.5 bottom-0 right-2.5"
                    title="Remove choice"
                    @click="removeChoice(choice.id)"
                >
                    <Trash2 class="size-6" />
                </button>
            </div>
            <button
                type="button"
                class="flex items-center gap-1 self-end text-brand-blue font-semibold text-sm hover:opacity-75 transition"
                @click="addChoice"
            >
                <Plus class="size-4" /> Add choice
            </button>
        </div>

        <FormRadio
            label="Select the correct answer"
            :question-index="props.questionNumber"
            :choices="model.answerChoices"
            v-model="correctChoice"
        />
        <div v-if="!hasCorrectChoice && model.answerChoices.length > 0">
            <span class="text-brand-red text-xs">Select a correct answer</span>
        </div>
    </div>
</template>