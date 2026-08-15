<script setup lang="ts">

const props = defineProps<{
    label: string
    bgColor?: string
    textColor?: string
    isBold? : boolean
    toName?: string
}>()

const bgColorClass = props.bgColor ? 'bg-' + props.bgColor : 'bg-brand-blue';
const textColorClass = props.textColor? 'text-' + props.textColor : 'text-white';
const boldClass = props.isBold ? 'font-bold' : 'font-medium';
</script>

<template>
    <router-link v-if="props.toName" :to="{ name: props.toName}">
        <button class="cursor-pointer rounded-2xl px-4 py-2 hover:scale-105 hover" :class="[bgColorClass, textColorClass, boldClass]">{{ props.label }}</button>
    </router-link>
    <button v-else class="cursor-pointer rounded-2xl px-4 py-2 hover:scale-105 hover" :class="[bgColorClass, textColorClass, boldClass]">{{ props.label }}</button>
</template>