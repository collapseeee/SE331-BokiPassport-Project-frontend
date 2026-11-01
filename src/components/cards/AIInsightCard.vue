<script lang="ts" setup>
import { ref } from 'vue';
import { Sparkles } from '@lucide/vue';
import { generateDashboardSummary } from '@/services/GeminiService';
import type { DashboardMetrics } from '@/types';
import Button from '../Button.vue';

const props = defineProps<{
    metrics: DashboardMetrics;
}>();

const summary = ref<string>('Click "Analyze" button to start the analyzing.');
const isLoading = ref<boolean>(false);

const runAnalysis = async () => {
    isLoading.value = true;
    try {
        summary.value = await generateDashboardSummary(props.metrics);
    } catch {
        summary.value = 'Failed to generate AI summary.';
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="border border-gray-300 rounded-xl shadow-lg bg-brand-white p-6 w-full flex flex-col items-start">
        <div class="flex flex-row items-center justify-between w-full">
            <div class="flex flex-row items-center gap-3">
                <div class="flex items-center justify-center size-10 rounded-xl border border-brand-blue text-brand-blue">
                    <Sparkles class="size-6" />
                </div>
                <div>
                    <h3 class="text-xl font-bold text-brand-black">BokiAI Executive Summary</h3>
                    <p class="text-sm text-brand-black">Analyzed by Gemini 3.8 Flash.</p>
                </div>
            </div>
            <Button
                @click="runAnalysis"
                :label="isLoading ? 'Analyzing...' : 'Analyze'"
                :disabled="isLoading"
                type="button"
                bgColor="brand-blue"
            />
        </div>
        <!-- Summary Text: Full width and left aligned -->
        <div class="mt-4 w-full text-start">
            <p v-if="!isLoading" class="text-brand-black text-md leading-relaxed">
                {{ summary }}
            </p>
            <div v-else class="flex items-center gap-2 text-md text-brand-black italic">
                <span class="inline-block size-2 rounded-full bg-brand-blue animate-ping"></span>
                Analyzing insight by Gemini...
                <span class="text-gray-400">(This takes longer than 15 seconds)</span>
            </div>
        </div>
    </div>
</template>