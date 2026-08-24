<script lang="ts" setup>
import type { Component } from 'vue'
import { computed } from 'vue'

const props = defineProps<{
  id: string
  label: string
  placeholder?: string
  icon?: Component
  required?: boolean
  type?: string
  textcolor?: string
}>()

const model = defineModel<string>()
const inputTextColor = computed(() => props.textcolor ? props.textcolor : 'text-brand-black')
</script>

<template>
  <div>
    <label :for="id" :class="['block text-sm font-medium mb-1', inputTextColor]">{{ props.label }}</label>
    <div class="relative">
      <span v-if="props.icon" class="absolute inset-y-0 left-3 flex items-center text-brand-black">
        <component :is="props.icon" class="w-5 h-5" />
      </span>
      <input
        :id="props.id"
        :name="props.id"
        :type="props.type ?? 'text'"
        :placeholder="props.placeholder"
        :required="props.required"
        v-model="model"
        :class="[
          'w-full py-2.5 border border-brand-gray rounded-md bg-white focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400',
          props.icon ? 'pl-10 pr-3' : 'px-3',
        ]"
      />
    </div>
  </div>
</template>