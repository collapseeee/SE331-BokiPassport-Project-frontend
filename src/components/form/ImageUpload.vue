<script setup lang="ts">
import { ref } from 'vue'
import { UserRound } from '@lucide/vue'

const modelValue = defineModel<string[]>({ default: () => [] })

const fileInput = ref<HTMLInputElement>()
const preview = ref<string | null>(null)
const isDragging = ref(false)

function openFilePicker() {
  fileInput.value?.click()
}

function handleFile(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    preview.value = e.target?.result as string
    modelValue.value = [file.name]
  }
  reader.readAsDataURL(file)
}

function handleDrop(event: DragEvent) {
  isDragging.value = false
  const file = event.dataTransfer?.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    preview.value = e.target?.result as string
    modelValue.value = [file.name]
  }
  reader.readAsDataURL(file)
}
</script>

<template>
  <div class="flex flex-col items-center space-y-3">
    <span class="text-sm font-medium text-brand-black">Select your Profile</span>
    <button
      type="button"
      class="relative w-32 h-32 rounded-full border-2 border-dashed transition-all duration-200 overflow-hidden group"
      :class="isDragging ? 'border-brand-blue bg-brand-blue/5 scale-105' : 'border-brand-dark-blue hover:border-brand-blue bg-gray-50'"
      @click="openFilePicker"
      @dragover.prevent="isDragging = true"
      @dragleave="isDragging = false"
      @drop.prevent="handleDrop"
    >
      <img v-if="preview" :src="preview" class="w-full h-full object-cover" />
      <div v-else class="flex flex-col items-center justify-center w-full h-full text-brand-dark-blue group-hover:text-brand-blue transition-colors">
        <UserRound class="w-10 h-10" />
        <span class="text-xs mt-1">Upload</span>
      </div>
      <div class="absolute inset-0 rounded-full bg-brand-blue/0 group-hover:bg-brand-blue/10 transition-colors" />
    </button>
    <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFile" />
  </div>
</template>
