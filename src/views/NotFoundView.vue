<script lang="ts" setup>
withDefaults(
  defineProps<{
    resource: string
  }>(),
  {
    resource: 'page',
  },
)
</script>

<template>
    <main class="flex flex-col items-center justify-center h-full">
        <h2>Oops! The {{ resource }} you're looking for is not found</h2>
        <RouterLink class="text-brand-blue underline decoration-0" :to="{name: 'Home'}">Back to the home page</RouterLink>
    </main>
</template>
