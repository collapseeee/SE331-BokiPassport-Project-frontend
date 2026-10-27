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
import VideoPlayer from '@/components/VideoPlayer.vue';

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
       <VideoPlayer :thumbnail-url="thumbnailUrl" :video-src="videoSrc"/>
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
