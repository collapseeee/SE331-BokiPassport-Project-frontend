<script setup lang="ts">
import TableItem from './TableItem.vue';

// Exam history state for passing to TableItem
// const examHistoryStore = useExamHistoryStore()
</script>


<template>
    <tbody>
        <TableItem v-for="value in [{ id: 0, date: '10/07/2026', name: 'Level 1', score: 4, status: 'Failed' }]" :key="value.id" :columns="value"/>
    </tbody>
</template>