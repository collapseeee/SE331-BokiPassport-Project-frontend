<script lang="ts" setup>
import { ref, watchEffect  } from 'vue';
import { defineCustomElement, MediaPlayerElement } from "vidstack/elements";
import type { Course } from '@/types';
import courseService from '@/services/course';

const prop = defineProps<{
    Id: string;
}>();

const course = ref<Course | null>(null);
defineCustomElement(MediaPlayerElement);


watchEffect(() => {
    if (prop.Id) {
        courseService.getCourse(Number(prop.Id))
        .then((res) => {
            course.value = res.data;
        }).catch((error) => {
            console.error('Error fetching course:', error);
        });
    }
});

</script>


<template>
    <div class="w-full min-h-screen bg-linear-to-b from-light-blue to-brand-white">
        <div class="flex flex-col items-center min-h-screen py-8 px-4">
            <!-- video  -->
        <media-player class="w-full max-w-4xl mx-auto" :src="course?.videoUrl">
            <media-provider></media-provider>
            <media-audio-layout></media-audio-layout>
            <media-video-layout></media-video-layout>
        <media-video-layout />
    </media-player>
        </div>
        <div class="w-full max-w-4xl mx-auto p-4">
            <div class="flex flex-col items-center justify-center gap-4">
                <!-- video information -->
            </div>
            <div class="flex flex-col items-center justify-center gap-4 mt-8">
                <!-- Next video card -->
            </div>
        </div>
    </div>
</template>
