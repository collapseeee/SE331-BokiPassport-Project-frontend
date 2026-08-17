<script lang="ts" setup>
import Container from '@/components/Container.vue';
import TableContainer from '@/components/table/TableContainer.vue';
import { ref } from 'vue';

const headers = ref<string[]>(['DATE', 'Exam Name', 'Score', 'Status'])
</script>
<template>
    <Container title="Exam history" isPagination>
        <TableContainer :headers="headers"/>
    </Container>
</template>