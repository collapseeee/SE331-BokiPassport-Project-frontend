<script lang="ts" setup>
import ExamCard from '@/components/cards/ExamCard.vue';
import { useUserStore } from '@/stores/user';
import { ref, onMounted } from 'vue';
import type { Exam } from '@/types';
import ExamService from '@/services/ExamService';
import AdminHeader from '@/components/AdminHeader.vue';

const userStore = useUserStore();
const userLevel = userStore.level;

const exams = ref<Exam[]>([]);
onMounted(() => {
    ExamService.getExams()
        .then(response => {
            exams.value = response.data;
        })
        .catch(error => {
            console.error(error);
        })
})
</script>

<template>
    <div class="bg-brand-white">
        <AdminHeader title="Exam Management" description="Boki Passport exam management system"/>
        <div class="flex flex-col items-center py-8">
            
            <div v-if="exams" class="grid grid-cols-1 md:grid-cols-2 gap-8 w-4/5 px-12 py-8">
                <ExamCard 
                    v-for="exam in exams" 
                    :key="exam.id" 
                    :exam="exam"
                    :user-level="Number(userLevel)"
                />
            </div>
            <div v-else class="flex flex-col items-center justify-center">
                <p>Loading Exam...</p>
            </div>
        </div>
    </div>    
</template>
