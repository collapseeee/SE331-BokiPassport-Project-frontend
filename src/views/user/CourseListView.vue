<script lang="ts" setup>
import videoCard from '@/components/cards/VideoCard.vue';
import type { Course } from '@/types';
import { computed, ref, watchEffect } from 'vue';
import courseService from '@/services/courseService';
import { useRoute } from 'vue-router';

const courses = ref<Course[] | null>(null)
const route = useRoute()
const filteredCourses = computed(() => {
    const level = route.query.level
    return (courses.value || []).filter(course => level === 'all' || !level || String(course.levelId) === level)
})

const linkClasses = 'bg-brand-blue hover:bg-brand-blue/60 font-bold hover:shadow-sm text-lg text-brand-white px-4 py-2 rounded-xl transition-all hover:scale-105 duration-300'
const linkActiveClasses = 'bg-brand-blue/40 shadow-lg font-medium'

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
            <div class="w-full max-w-md p-8 space-y-6">
                <!-- Title -->
                <div class="flex flex-col items-center space-y-2">
                    <h1 class="text-brand-black">Course List</h1>
                </div>

                <!-- filter by level -->
                <div class="flex flex-row justify-between">
                    <div class="flex gap-x-4">
                        <RouterLink :class="[linkClasses, $route.query.level === 'all' ? linkActiveClasses : '']" :to="{ query: { level: 'all' }}">ALL</RouterLink>
                        <RouterLink :class="[linkClasses, $route.query.level === '1' ? linkActiveClasses : '']" :to="{ query: { level: '1' }}">LEVEL 1</RouterLink>
                        <RouterLink :class="[linkClasses, $route.query.level === '2' ? linkActiveClasses : '']" :to="{ query: { level: '2' }}">LEVEL 2</RouterLink>
                        <RouterLink :class="[linkClasses, $route.query.level === '3' ? linkActiveClasses : '']" :to="{ query: { level: '3' }}">LEVEL 3</RouterLink>
                        <RouterLink :class="[linkClasses, $route.query.level === '4' ? linkActiveClasses : '']" :to="{ query: { level: '4' }}">LEVEL 4</RouterLink>
                    </div>
                </div>
            </div>
        </div>
        <!-- course card -->
        <div class="flex flex-wrap justify-center gap-4 ">
                <videoCard v-for="course in filteredCourses" :key="course.id" :course="course"/> 
        </div>
        
    </div>
</template>
