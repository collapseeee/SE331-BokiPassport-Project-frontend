<script lang="ts" setup>
import videoCard from '@/components/cards/VideoCard.vue';
import type { Course } from '@/types';
import { computed, ref, watchEffect } from 'vue';
import courseService from '@/services/courseService';
import { useRoute } from 'vue-router';
import LevelFilter from '@/components/LevelFilter.vue';

const courses = ref<Course[] | null>(null)
const route = useRoute()
const filteredCourses = computed(() => {
    const level = route.query.level
    return (courses.value || []).filter(course => level === 'all' || !level || String(course.level.id) === level)
})
watchEffect(() => {
    courses.value = null
    courseService.getCourses().then(res => {
        courses.value = res.data
    }).catch(error => {
        console.error('Error fetching courses:', error)
    })
})
</script>

<template>
    <div class="w-full h-full bg-linear-to-b from-light-blue to-brand-white">
        <div class="flex flex-col items-center">
            <div class="w-full p-8 space-y-6">
                <!-- Title -->
                <div class="flex flex-col items-center space-y-2">
                    <h1 class="text-brand-black">Course List</h1>
                </div>

                <!-- filter by level -->
                <LevelFilter/>
            </div>
        </div>
        <!-- course card -->
        <div class="flex flex-wrap justify-center gap-4 ">
                <videoCard v-for="course in filteredCourses" :key="course.id" :course="course"/> 
        </div>
        
    </div>
</template>
