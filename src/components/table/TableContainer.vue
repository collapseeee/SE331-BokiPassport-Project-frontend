<script setup lang="ts">
import type { ExamHistory, User } from '@/types.ts';
import TableBody from './TableBody.vue';
import TableHeader from './TableHeader.vue';
defineProps<{
    headers: Array<string>,
    rows: Array<User | ExamHistory>
}>()
</script>


<template>
    <table class="w-full">
        <TableHeader :headers="headers"/>
        <TableBody v-if="rows" :rows="rows"/>
    </table>
</template>