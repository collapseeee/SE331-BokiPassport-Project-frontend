<script lang="ts" setup>
withDefaults(
  defineProps<{
    role: string
  }>(),
  {
    role: 'You',
  },
)
</script>

<template>
    <main class="flex flex-col items-center justify-center h-full">
        <h2>Hey! {{ role }} have no permission to access this page.</h2>
        <RouterLink class="text-brand-blue underline decoration-0" :to="{name: 'Home'}">Back to the home page</RouterLink>
    </main>
</template>
