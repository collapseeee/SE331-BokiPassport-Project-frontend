<script lang="ts" setup>
import AdminHeader from '@/components/AdminHeader.vue';
import Button from '@/components/Button.vue';
import VideoCard from '@/components/cards/VideoCard.vue';
import LevelFilter from '@/components/LevelFilter.vue';
import { useCourseStore } from '@/stores/course';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const courseStore = useCourseStore()
const route = useRoute()
const filteredCourses = computed(() => {
    const level = route.query.level
    return (courseStore.courses || []).filter(course => level === 'all' || !level || String(course.level.id) === level)
})

const router = useRouter()
const handleAdd = () => {
    router.go(0) // Just refresh the page. Nothing special.
}
</script>

<template>
    <div>
        <AdminHeader title="Course Management" description="Boki Passport course management system"/>
        <div class="p-5 flex flex-col gap-y-2">
            <div class="flex flex-row justify-between">
                <LevelFilter/>
                <Button @click="handleAdd" isBold label="ADD">Hello</Button>
            </div>
            <div v-if="filteredCourses" class="grid grid-cols-4 w-full">
                <VideoCard v-for="course in filteredCourses" :key="course.id" :course="course"/>
            </div>
        </div>
    </div>
    
</template>
