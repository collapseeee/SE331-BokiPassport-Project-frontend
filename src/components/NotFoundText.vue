<script setup lang="ts">
defineProps<{
    text: string
}>()
</script>

<template>
    <h6 class="w-full text-brand-black/75 text-center py-10 font-semibold!">{{ text }}</h6>
</template>