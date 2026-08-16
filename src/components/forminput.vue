<script lang="ts" setup>
    import type { Component } from 'vue'

    const props = defineProps<{
        modelValue: string
         id: string
         label: string
         placeholder?: string
        icon?: Component
        required?: boolean
        type?: string
    }>()

    const emit = defineEmits<{
        'update:modelValue': [value: string]
    }>()

</script>

<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-800 mb-1">{{ label }}</label>
    <div class="relative">
      <span v-if="icon" class="absolute inset-y-0 left-3 flex items-center text-brand-gray">
        <component :is="icon" class="w-5 h-5" />
      </span>
      <input
        :id="id"
        :name="id"
        :type="type ?? 'text'"
        :placeholder="placeholder"
        :required="required"
        :value="modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :class="[
          'w-full py-2.5 border border-brand-gray rounded-md bg-white focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400',
          icon ? 'pl-10 pr-3' : 'px-3',
        ]"
      />
    </div>
  </div>
</template>