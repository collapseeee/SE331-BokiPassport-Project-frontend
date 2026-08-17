<script setup lang="ts">
import type { Course } from '@/types/course'
import { Play } from '@lucide/vue'
import { computed, ref } from 'vue'

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

  return match && match[2].length === 11 ? match[2] : null
})

const thumbnailUrl = computed(() => {
  if (!videoId.value) return null
  const quality = thumbnailFailed.value ? 'hqdefault' : 'maxresdefault'
  return `https://img.youtube.com/vi/${videoId.value}/${quality}.jpg`
})
</script>

<template>
  <RouterLink
    :to="{ name: 'CourseView', params: { id: course.id } }"
    class="block rounded-2xl overflow-hidden bg-slate-800 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 group"
  >
    <!-- Thumbnail -->
    <div class="relative aspect-video overflow-hidden bg-slate-700">
      <img
        v-if="thumbnailUrl"
        :src="thumbnailUrl"
        :alt="course.title"
        class="w-full h-full object-cover"
        @error="thumbnailFailed = true"
      />

      <!-- Level badge -->
      <span
        class="absolute top-2 left-2 bg-sky-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow"
      >
        {{ course.level }}
      </span>

      <!-- Duration badge -->
      <span
        class="absolute bottom-2 right-2 bg-black/70 text-white text-[11px] font-medium px-1.5 py-0.5 rounded"
      >
        {{ course.duration }}
      </span>

      <!-- Play button overlay -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div
          class="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110"
        >
          <Play class="w-6 h-6 text-brand-blue" />
        </div>
      </div>
    </div>

    <!-- Body -->
    <div class="p-3.5">
      <h3 class="text-white font-bold text-sm">
        {{ course.title }}
      </h3>
      <p class="text-slate-400 text-xs mt-1 line-clamp-2 leading-snug">
        {{ course.description }}
      </p>
    </div>
  </RouterLink>
</template>