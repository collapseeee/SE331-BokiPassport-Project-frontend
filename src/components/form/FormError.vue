<script setup lang="ts">
defineProps<{
  errors?: string | string[]
}>()
</script>

<template>
  <p v-if="errors" class="mt-1 text-sm text-brand-red">
    {{ Array.isArray(errors) ? errors[0] : errors }}
  </p>
</template>
