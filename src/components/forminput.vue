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
    <label :for="id" class="block text-sm font-medium text-gray-800 mb-1">{{ props.label }}</label>
    <div class="relative">
      <span v-if="props.icon" class="absolute inset-y-0 left-3 flex items-center text-brand-gray">
        <component :is="props.icon" class="w-5 h-5" />
      </span>
      <input
        :id="props.id"
        :name="props.id"
        :type="props.type ?? 'text'"
        :placeholder="props.placeholder"
        :required="props.required"
        :value="props.modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :class="[
          'w-full py-2.5 border border-brand-gray rounded-md bg-white focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400',
          props.icon ? 'pl-10 pr-3' : 'px-3',
        ]"
      />
    </div>
  </div>
</template>