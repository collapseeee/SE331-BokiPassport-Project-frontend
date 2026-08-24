<script setup lang="ts">
const props = defineProps<{
    name: string,
}>()
const emit = defineEmits(['select'])

const handleClick = () => {
    emit('select', props.name)
}
</script>

<template>
    <div @click="handleClick" class="w-full cursor-pointer px-3 py-2 text-sm hover:shadow-md hover:!bg-brand-blue transition-all">{{ name }}</div>
</template>