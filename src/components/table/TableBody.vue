<script setup lang="ts">
import type { ExamHistory, User } from '@/types.ts';
import TableItem from './TableItem.vue';
defineProps<{
    rows: Array<User | ExamHistory>
}>()

// Exam history state for passing to TableItem
// const examHistoryStore = useExamHistoryStore()
</script>

<template>
    <tbody class="w-full flex flex-col">
        <TableItem v-for="row in rows" class="bg-brand-white hover:bg-brand-gray/30" :key="row.id" :row="row" />
    </tbody>
</template>