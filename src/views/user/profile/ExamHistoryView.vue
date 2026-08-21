<script lang="ts" setup>
import Container from '@/components/Container.vue';
import TableContainer from '@/components/table/TableContainer.vue';
import UserService from '@/services/UserService';
import { useUserStore } from '@/stores/user';
import type { ExamHistory } from '@/types';
import { onMounted, ref, watchEffect } from 'vue';

const userStore = useUserStore()

const headers = ref<string[]>(['DATE', 'Exam Name', 'Score', 'Status'])

const exams = ref<ExamHistory[] | null>(null)

onMounted(() => {
    watchEffect(() => {
        UserService.getUserExams(userStore.id)
            .then(res => {
                exams.value = res.data.userExamHistories as ExamHistory[]
            })
            .catch(err => console.error(err.message))
    })
})
</script>
<template>
    <Container title="Exam history" isPagination>
        <TableContainer v-if="exams" :headers="headers" :rows="exams"/>
    </Container>
</template>