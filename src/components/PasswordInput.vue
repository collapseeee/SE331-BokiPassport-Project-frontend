<script lang="ts" setup>
import { ref } from 'vue'
import { Lock, Eye, EyeOff } from '@lucide/vue'

const props = defineProps<{
  modelValue: string
  id: string
  label: string
  placeholder?: string
  required?: boolean
}>()

const showPassword = ref(false)
const passworPlaceholder = props.placeholder ? props.placeholder : 'Enter your password'
</script>

<template>
  <div>
    <label :for="props.id" class="block text-sm font-medium text-gray-800 mb-1">{{ props.label }}</label>
    <div class="relative">
      <span class="absolute inset-y-0 left-3 flex items-center text-brand-black">
        <Lock class="w-5 h-5" />
      </span>
      <input
        :id="props.id"
        :name="props.id"
        :type="showPassword ? 'text' : 'password'"
        :required="props.required"
        :value="props.modelValue"
        :placeholder="passworPlaceholder"
        class="w-full pl-10 pr-10 py-2.5 border border-brand-gray rounded-md bg-white focus:outline-none focus:ring focus:ring-brand-blue focus:border-brand-blue"
      />
      <button
        type="button"
        @click="showPassword = !showPassword"
        class="absolute inset-y-0 right-3 flex items-center text-brand-gray hover:text-brand-light-blue"
      >
        <Eye v-if="showPassword" class="w-5 h-5" />
        <EyeOff v-else class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>