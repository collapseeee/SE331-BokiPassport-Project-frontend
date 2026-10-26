<script setup lang="ts">
import { ref } from 'vue'
import { UserRound } from '@lucide/vue'
import { uploadProfileImage } from '@/services/ImageService'
import FormError from './FormError.vue'
import Button from '../Button.vue'

const modelValue = defineModel<string[]>({ default: () => [] })
const props = withDefaults(defineProps<{
    maxSize?: number
    accept?: string
}>(), {
    maxSize: 2,
    accept: 'image/*'
})

const emit = defineEmits<{
    (e: 'cancel'): void
}>()

const MAX_SIZE = props.maxSize * 1024 * 1024
const fileError = ref<string>('')
const selectedFile = ref<File | null>(null)
const fileInput = ref<HTMLInputElement>()
const preview = ref<string | null>(null)
const isDragging = ref(false)
const isUploading = ref(false)
const isConfirming = ref(false)


function handleFile(file: File) {
    const allowed = ['image/jpeg', 'image/png']
    if (!allowed.includes(file.type)) {
        fileError.value = 'only JPG and PNG files are allowed'
        preview.value = null
        selectedFile.value = null
        return
    }
    if (file.size > MAX_SIZE) {
        fileError.value = `Imagefile must be smaller than ${props.maxSize}MB`
        preview.value = null
        selectedFile.value = null
        return
    }

    fileError.value = ''
    selectedFile.value = file

    const reader = new FileReader()
    reader.onload = (e) => {
        preview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)

    isConfirming.value = true
}

async function confirmUpload() {
    if (!selectedFile.value) return
    isUploading.value = true
    fileError.value = ''
    try {
        const name = await uploadProfileImage(selectedFile.value)
        modelValue.value = [name]
    } catch (err) {
        fileError.value = 'Upload failed. Please try again.'
        console.error('Upload failed:', err)
    } finally {
        isUploading.value = false
        isConfirming.value = false
        selectedFile.value = null
        preview.value = null
    }
}

function cancelUpload() {
    isConfirming.value = false
    selectedFile.value = null
    preview.value = null
    fileError.value = ''
    emit('cancel')
}

function handleFileEvent(event: Event) {
    if (isUploading.value) return
    const file = (event.target as HTMLInputElement).files?.[0]
    if (!file) return
    handleFile(file)
}

function handleDrop(event: DragEvent) {
    isDragging.value = false
    const file = event.dataTransfer?.files?.[0]
    if (!file) return
    handleFile(file)
}

function openFilePicker() {
    fileInput.value?.click()
}
</script>

<template>
  <div class="flex flex-col items-center space-y-3">
    <label for="profile-image" class="text-sm font-medium text-brand-black">Select your Profile</label>

    <!-- Drop / click zone -->
    <button
      type="button"
      class="relative w-32 h-32 rounded-full border-2 border-dashed transition-all duration-200 overflow-hidden group cursor-pointer"
      :class="{
        'border-brand-blue bg-brand-blue/5 scale-105': isDragging,
        'border-brand-dark-blue hover:border-brand-blue bg-gray-50': !isDragging,
        'opacity-50 cursor-not-allowed': isUploading
      }"
      :disabled="isUploading"
      @click="openFilePicker"
      @dragover.prevent="isDragging = true"
      @dragleave="isDragging = false"
      @drop.prevent="handleDrop"
    >
      <img v-if="preview" :src="preview" alt="Selected profile preview" class="w-full h-full object-cover" />
      <div v-else class="flex flex-col items-center justify-center w-full h-full text-brand-dark-blue group-hover:text-brand-blue transition-colors">
        <UserRound class="w-10 h-10" />
        <span class="text-xs mt-1">Upload</span>
      </div>

      <!-- Loading overlay -->
      <div v-if="isUploading" class="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
        <span class="text-white text-xs">Uploading...</span>
      </div>
      <div class="absolute inset-0 rounded-full bg-brand-blue/0 group-hover:bg-brand-blue/10 transition-colors" />
    </button>

    <!-- File input overlay: only when no preview and not confirming/uploading -->
    <input
      ref="fileInput"
      id="profile-image"
      type="file"
      :accept="props.accept"
      class="hidden"
      @change="handleFileEvent"
    />

    <!-- Confirm / Cancel after preview -->
    <div class="flex gap-x-2">
      <Button
        v-if="preview"
        label="Confirm"
        bg-color="brand-blue"
        @click="confirmUpload"
        :disabled="isUploading"
      />
      <Button
        label="Cancel"
        bg-color="brand-black"
        @click="cancelUpload"
        :disabled="isUploading"
      />
    </div>

    <!-- Error under the field -->
    <FormError v-if="fileError" :errors="fileError" />
  </div>
</template>