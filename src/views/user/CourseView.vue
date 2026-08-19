<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { defineCustomElement, MediaPlayerElement } from 'vidstack/elements';
import type { Course } from '@/types';
import courseService from '@/services/course';
import 'vidstack/player/styles/default/theme.css';
import 'vidstack/player';
import 'vidstack/player/ui';
import 'vidstack/player/layouts/default';

const prop = defineProps<{
  Id: string;
}>();

const course = ref<Course | null>(null);

watchEffect(() => {
  if (prop.Id) {
    courseService
      .getCourse(Number(prop.Id))
      .then((res) => {
        course.value = res.data;
      })
      .catch((error) => {
        console.error('Error fetching course:', error);
      });
  }
});

const videoSrc = 'youtube/omB2JkC4QfA';
</script>

<template>
  <div class="w-full min-h-screen bg-linear-to-b from-brand-light-blue to-brand-white">
    <div class="flex min-h-screen flex-col items-center px-4 py-8">
      <!-- video  -->
       <media-player class="mx-auto h-auto w-full max-w-4xl grid grid-cols-12" crossorigin playsinline :src="videoSrc">
            <media-provider />

            <media-play-button
                class="group relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset ring-sky-400 hover:bg-white/20 data-[focus]:ring-4"
                >
                <!-- See "Icons" component page for setup before using the following: -->
                <media-icon type="play" class="hidden h-8 w-8 group-data-[paused]:block"></media-icon>
                <media-icon type="pause" class="h-8 w-8 group-data-[paused]:hidden"></media-icon>
            </media-play-button>
            
  </media-player>
    </div>
    <div class="mx-auto w-full max-w-4xl p-4">
      <div class="flex flex-col items-center justify-center gap-4">
        <!-- video information -->
      </div>
      <div class="mt-8 flex flex-col items-center justify-center gap-4">
        <!-- Next video card -->
      </div>
    </div>
  </div>
</template>
