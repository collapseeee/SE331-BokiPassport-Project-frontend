<script lang="ts" setup>
import type { AnswerChoice } from '@/types';

const props = defineProps<{
    label: string
    questionIndex: number
    choices?: AnswerChoice[]
}>();

const model = defineModel();
</script>

<template>
    <div class="bg-brand-white p-8 border border-gray-200 rounded-2xl">
        <form>
            <p class="text-brand-blue font-semibold">Question {{ questionIndex }}</p>
            <h3>
                {{ props.label }}
            </h3>
            <div class="flex flex-col gap-2 mt-4">
                <div 
                    v-for="choice in props.choices" 
                    :key="choice.id" 
                    class="flex items-center border rounded-2xl py-2 px-4 cursor-pointer transition"
                    :class="[
                        (model === choice.answerText || model === choice.id)
                            ? 'border-brand-blue bg-brand-sky-blue font-semibold'
                            : 'border-brand-gray hover:border-gray-400 hover:bg-gray-100'
                    ]"
                >
                    <input 
                        type="radio" 
                        :id="String(choice.id)" 
                        :name="String(questionIndex)" 
                        :value="choice.answerText"
                        v-model="model"
                        class="cursor-pointer"
                    >
                    <label :for="String(choice.id)" class="pl-2 cursor-pointer w-full">{{ choice.answerText }}</label>
                </div>
            </div>
        </form>
    </div>
</template>