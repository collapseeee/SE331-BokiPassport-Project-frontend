<script lang="ts" setup>
import { ref, computed, watchEffect } from 'vue';
import type { Course } from '@/types';
import courseService from '@/services/courseService';
import Button from '@/components/Button.vue';
import 'vidstack/player/styles/default/theme.css';
import 'vidstack/player';
import 'vidstack/player/ui';
import 'vidstack/player/layouts/default';
import 'vidstack/icons';
import { ChevronLeft } from '@lucide/vue';

const props = defineProps<{
  id: string;
}>();

const course = ref<Course | null>(null);
const thumbnailFailed = ref(false)
const nextLevel = computed(() => {
  if (!course.value) return null;
  const currentLevel = course.value.level.id;
  return currentLevel < 4 ? Number(currentLevel) + 1 : null;
});

watchEffect(() => {
  course.value = null;
  courseService
    .getCourse(Number(props.id))
    .then((res) => {
      course.value = res.data;
    })
    .catch((error) => {
      console.error('Error fetching course:', error);
    });
});

const videoId = computed(() => {
  const url = course.value?.videoUrl;
  if (!url) return null

  // Matches standard, share, embed, and shorts YouTube URLs
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2]?.length === 11 ? match[2] : null
})

const videoSrc = computed(() => {
  return videoId.value ? `youtube/${videoId.value}` : 'youtube/QDia3e12czc';

});

const thumbnailUrl = computed(() => {
  if (!videoId.value) return null
  const quality = thumbnailFailed.value ? 'hqdefault' : 'maxresdefault'
  return `https://img.youtube.com/vi/${videoId.value}/${quality}.jpg`
})



</script>

<template>
  <div class="w-full bg-linear-to-b from-brand-light-blue to-brand-white">
    <div class="flex flex-col items-center px-4 py-8">
      <RouterLink :to="{ name: 'CourseList' }" class="place-self-start py-1"><p class="flex items-center font-medium text-xl hover:*:stroke-2 hover:font-bold transition-all text-brand-dark-blue"><ChevronLeft class="size-8 stroke-1 transition-all"/>Back</p></RouterLink>
      <!-- video  -->
      <media-player class="relative aspect-video w-full max-w-4xl overflow-hidden rounded-lg bg-black" 
        crossorigin 
        playsinline 
        :src='videoSrc'>
            <!-- Video provider, positioned over the video -->
            <media-provider>
              <media-poster
              :src="thumbnailUrl"
              alt="Video thumbnail"
              class="absolute inset-0 h-full w-full object-cover data-visible:opacity-100 opacity-0 transition-opacity"
            ></media-poster>
            </media-provider>
          


            <!-- Controls bar, positioned over the video -->
            <media-controls class="pointer-events-none absolute position:bottom inset-0 z-10 flex h-full w-full flex-col bg-linear-to-t from-black/10 to-transparent opacity-0 transition-opacity data-visible:opacity-100">

                <media-controls-group class="pointer-events-auto flex w-full items-center px-2">
                    <!-- Top Controls Group -->
                    </media-controls-group>
                    <div class="flex-1"></div>
                <media-controls-group class="pointer-events-auto flex w-full items-center justify-center px-2">
                    <!-- Center Controls Group -->
                     <media-play-button
                        class="group absolute inset-x-0 top-0 bottom-16 z-10 flex cursor-pointer items-center justify-center outline-none"
                        >
                    <!-- See "Icons" component page for setup before using the following: -->
                        
                    </media-play-button>

                    </media-controls-group>
                    <div class="flex-1"></div>
                <!-- Bottom row: play, time, volume, fullscreen -->
                <media-controls-group class="pointer-events-auto flex w-full items-center px-2">
                    <media-play-button
                        class="group relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset ring-brand-blue hover:bg-white/20 data-focus:ring-4"
                        >
                    <!-- See "Icons" component page for setup before using the following: -->
                        <media-icon type="play" class="text-brand-blue hidden h-8 w-8 group-data-paused:block"></media-icon>
                        <media-icon type="pause" class="text-brand-blue h-8 w-8 group-data-paused:hidden"></media-icon>
                    </media-play-button>

                    <media-time class="text-sm rounded-md bg-brand-black text-brand-white p-0.5" type="current"></media-time>
                    
                    

                    <media-time-slider
                      class="group relative mx-[7.5px] inline-flex h-10 w-full cursor-pointer touch-none select-none items-center outline-none aria-hidden:hidden"
                    >
                      <!-- Track -->
                      <div
                        class="relative z-0 h-1.25 w-full rounded-sm bg-brand-black ring-sky-400 group-data-focus:ring-[3px]"
                      >
                        <!-- Track Fill -->
                        <div
                          class="absolute h-full w-(--slider-fill) rounded-sm bg-brand-blue will-change-[width]"
                        ></div>
                        <!-- Progress -->
                        <div
                          class="absolute z-10 h-full w-(--slider-progress) rounded-sm bg-white/50 will-change-[width]"
                        ></div>
                      </div>
                      <!-- Thumb -->
                      <div
                        class="absolute left-(--slider-fill) top-1/2 z-20 h-3.75 w-3.75 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#cacaca] bg-white opacity-0 ring-white/40 transition-opacity will-change-[left] group-data-active:opacity-100 group-data-dragging:ring-4"
                      ></div>
                    </media-time-slider>
                    
                    <media-time class="text-sm rounded-md bg-brand-black text-brand-white p-0.5" type="duration"></media-time>
                    <!-- <div class="flex-1"></div> -->

                    <media-mute-button
                      class="group relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset ring-sky-400 hover:bg-white/20 data-focus:ring-4"
                    >
                      <!-- See "Icons" component page for setup before using the following: -->
                      <media-icon type="mute" class="text-brand-blue hidden h-8 w-8 group-data-[state='muted']:block"></media-icon>
                      <media-icon type="volume-low" class="text-brand-blue hidden h-8 w-8 group-data-[state='low']:block"></media-icon>
                      <media-icon
                        type="volume-high"
                        class="text-brand-blue hidden h-8 w-8 group-data-[state='high']:block"
                      ></media-icon>
                    </media-mute-button>

                    <media-volume-slider
                      class="group relative mx-[7.5px] inline-flex h-10 w-full max-w-20 cursor-pointer touch-none select-none items-center outline-none aria-hidden:hidden"
                    >
                      <!-- Track -->
                      <div
                        class="relative z-0 h-1.25 w-full rounded-sm bg-brand-black ring-sky-400 group-data-focus:ring-[3px]"
                      >
                        <!-- Track Fill -->
                        <div
                          class="absolute h-full w-(--slider-fill) rounded-sm bg-brand-blue will-change-[width]"
                        ></div>
                      </div>
                      <!-- Thumb -->
                      <div
                        class="absolute left-(--slider-fill) top-1/2 z-20 h-3.75 w-3.75 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#cacaca] bg-white opacity-0 ring-white/40 transition-opacity will-change-[left] group-data-active:opacity-100 group-data-dragging:ring-4"
                      ></div>
                    </media-volume-slider>

                    <media-fullscreen-button
                      class="group relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset ring-sky-400 hover:bg-white/20 aria-hidden:hidden data-focus:ring-4"
                    >
                      <!-- See "Icons" component page for setup before using the following: -->
                      <media-icon type="fullscreen" class="text-brand-blue h-8 w-8 group-data-active:hidden"></media-icon>
                      <media-icon type="fullscreen-exit" class="text-brand-blue hidden h-8 w-8 group-data-active:block"></media-icon>
                    </media-fullscreen-button>
                </media-controls-group>
            </media-controls>
        </media-player>
      <div class="mt-4 flex w-full max-w-4xl flex-col gap-4 md:flex-row">
        <!-- video info -->
        <div class="flex-1 rounded-lg bg-brand-black p-4">
          <h2 class="text-brand-blue text-xl font-bold">{{ course?.name }}</h2>
          <p class="mt-1 text-sm text-brand-white">{{ course?.description }}</p>
        </div>

        <!-- next step -->
        <div class="w-full rounded-lg p-6 bg-brand-black text-center text-brand-white md:w-72">
          <p class="text-brand-blue font-semibold">Next Step</p>
          <p class="mt-1 text-sm text-brand-white/80">Level {{ nextLevel ? nextLevel : 'Already Maxed Out' }}</p>
          <br>
          <Button label="Go back" right-Arrow class="group w-full" to-name="CourseList" />
        </div>
      </div>
    </div>
  </div>
</template>
