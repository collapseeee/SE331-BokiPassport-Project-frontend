<script setup lang="ts">
import { type Course } from '@/types';
import { Play } from '@lucide/vue';

defineProps<{
    course: Course
}>()
</script>


<template>
    <div class="w-80 h-72 bg-brand-black text-brand-white rounded-xl cursor-pointer">
        <div class="grid relative w-full">
            <p class="bg-brand-blue px-3 py-1 m-3 absolute rounded-xl">Level {{ course.levelId }}</p>
            <Play class="absolute place-self-center size-16 bg-brand-white/50 border border-brand-blue p-2 rounded-xl text-brand-blue"/>
            <img class="border h-48 w-full rounded-xl" src="https://img.youtube.com/vi/omB2JkC4QfA/hqdefault.jpg" alt="">
        </div>
        <div class="h-full flex flex-col gap-y-2 px-5 py-3">
            <h3>{{ course.name }}</h3>
            <p class="text-sm text-wrap h-full truncate">{{ course.description }}</p>
        </div>
    </div>
</template>