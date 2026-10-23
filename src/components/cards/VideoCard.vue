<script setup lang="ts">
import { type Course } from '@/types';
import { Play } from '@lucide/vue';
import { computed, ref } from 'vue';

const props = defineProps<{
    course: Course
}>()

const thumbnailFailed = ref(false)

const videoId = computed(() => {
  const url = props.course.videoUrl
  if (!url) return null

  // Matches standard, share, embed, and shorts YouTube URLs
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)

  return match && match[2]?.length === 11 ? match[2] : null
})

const thumbnailUrl = computed(() => {
  if (!videoId.value) return null
  const quality = thumbnailFailed.value ? 'hqdefault' : 'maxresdefault'
  return `https://img.youtube.com/vi/${videoId.value}/${quality}.jpg`
})
</script>


<template>
    <RouterLink :to="{ name: 'CourseView', params: { id: course.id } }" >
    <div class="w-80 h-full bg-brand-black text-brand-white rounded-xl cursor-pointer">
        <div class="grid relative w-full">
            <p class="bg-brand-blue px-3 py-1 m-3 absolute rounded-xl">Level {{ course.levels.id }}</p>
            <Play class="absolute place-self-center size-16 bg-brand-white/50 border border-brand-blue p-2 rounded-xl text-brand-blue"/>
            <img class="border h-48 w-full rounded-xl" :src="thumbnailUrl == null ? '' : thumbnailUrl" @error="thumbnailFailed = true" alt="">
        </div>
        <div class="h-full flex flex-col gap-y-2 px-5 py-3">
            <h3>{{ course.name }}</h3>
            <p class="text-sm h-full text-wrap truncate overflow-hidden whitespace-nowrap">{{ course.description }}</p>
        </div>
    </div>
    </RouterLink>
</template>