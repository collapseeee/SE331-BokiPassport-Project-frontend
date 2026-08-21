<script setup lang="ts">
defineProps<{
    title: string,
    description: string
}>()
</script>

<template>
    <header class="p-5">
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
    </header>
</template>