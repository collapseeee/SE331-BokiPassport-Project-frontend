<script lang="ts" setup>
import AdminHeader from '@/components/AdminHeader.vue';
import LevelCard from '@/components/cards/LevelCard.vue';
import PostOperationModal from '@/components/modal/PostOperationModal.vue';
import LevelService from '@/services/LevelService';
import type { Level } from '@/types';
import { onMounted, ref, watchEffect } from 'vue';

const levels = ref<Level[] | null>(null)
onMounted(() => {
    watchEffect(() => {
        LevelService.getLevels()
            .then(res => levels.value = res.data)
    })
})

const isModalOpen = ref(false);
const isSuccess = ref(true);
const operationMsg = ref('Level Update')
const successMsg = ref('Level X updated successfully.')
const onLevelSave = (success: boolean, levelName: string) => {
    isSuccess.value = success;
    isModalOpen.value = true
    successMsg.value = `${levelName} updated successfully.`
}
</script>

<template>
    <div>
        <PostOperationModal v-model="isModalOpen" :operationMsg="operationMsg" :success="isSuccess" :successMsg="successMsg" />
        <AdminHeader title="Level Management" description="Boki Passport level management system"/>
        <div class="p-5 flex flex-col gap-2">
            <div v-if="levels" class="grid grid-cols-1 xl:grid-cols-2 gap-3">
                <LevelCard v-for="level in levels" :key="level.id" :level="level" @saved="onLevelSave" />
            </div>
            <h1 class=" text-brand-navy-blue" v-else>Loading...</h1>
        </div>
    </div>
</template>
