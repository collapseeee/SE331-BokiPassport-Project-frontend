<script lang="ts" setup>
import Container from '@/components/Container.vue';
import NotFoundText from '@/components/NotFoundText.vue';
import TableContainer from '@/components/table/TableContainer.vue';
import UserService from '@/services/UserService';
import Pagination from '@/components/Pagination.vue';
import { useAuthStore } from '@/stores/auth';
import type { ExamHistory } from '@/types';
import { computed, onMounted, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
const props = defineProps<{
    page: number
}>()

const authStore = useAuthStore()
const route = useRoute()

const { isAdmin } = storeToRefs(authStore)
const headers = ref<string[]>(['DATE', 'Exam Name', 'Score', 'Status'])

const paginatedExam = ref<ExamHistory[] | null>(null)
const totalExams = ref<number>(0)
const currentItems = ref<number>(0)

const assignExams = (id: number) => {
    UserService.getExamHistories(id, props.page)
        .then(res => {
            paginatedExam.value = res.data as ExamHistory[]
            currentItems.value = res.data.length
        })
    UserService.getUserExams(id)
        .then(res => {
            totalExams.value = res.data.userExamHistories.length
        })
        // a real-backend user has no row in the json-server mock yet
        .catch(() => totalExams.value = 0)
}

onMounted(() => {
    watchEffect(() => {
        if (isAdmin) {
            assignExams(Number(route.params.id))
        } else {
            if (authStore.id !== null) assignExams(authStore.id)
        }
    })
})

const hasNextPage = computed(() => {
    return props.page < Math.ceil(totalExams.value / 5)
})
</script>
<template>
    <Container title="Exam history" isPagination>
        <div v-if="paginatedExam">
            <TableContainer :headers="headers" :rows="paginatedExam"/>
            <Pagination :page="Number(page)" :currentItems :totalItems="totalExams" :hasNextPage/>
        </div>
        <NotFoundText v-else text="No Exam Taken Yet!"/>
    </Container>
</template>