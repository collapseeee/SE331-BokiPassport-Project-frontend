<script setup lang="ts">
import { MoveLeftIcon, MoveRightIcon } from '@lucide/vue';
const props = withDefaults(defineProps<{
    label: string
    bgColor?: string
    textColor?: string
    isBold? : boolean
    toName?: string
    leftArrow?: boolean
    rightArrow?: boolean
}>(), {
    leftArrow: false,
    rightArrow: false
})

const bgColorClass = props.bgColor ? 'bg-' + props.bgColor : 'bg-brand-blue';
const textColorClass = props.textColor? 'text-' + props.textColor : 'text-white';
const boldClass = props.isBold ? 'font-bold' : 'font-medium';
let paddingClass = 'px-4 py-2'
if (props.leftArrow) paddingClass = 'py-2 pl-10 pr-4'
if (props.rightArrow) paddingClass = 'py-2 pl-4 pr-10'
if (props.leftArrow && props.rightArrow) paddingClass = 'py-2 px-10'
</script>

<template>
    <div class="relative hover:scale-105">
        <span v-if="props.leftArrow" class="absolute inset-y-0 left-3 flex items-center text-brand-black">
            <MoveLeftIcon :class="textColorClass" />
        </span>
        <router-link v-if="props.toName" :to="{ name: props.toName}">
            <button class="cursor-pointer rounded-2xl" :class="[bgColorClass, textColorClass, boldClass, paddingClass]">{{ props.label }}</button>
        </router-link>
        <button v-else class="cursor-pointer rounded-2xl" :class="[bgColorClass, textColorClass, boldClass, paddingClass]">{{ props.label }}</button>
        <span v-if="props.rightArrow" class="absolute inset-y-0 right-3 flex items-center text-brand-black">
            <MoveRightIcon :class="textColorClass" />
        </span>
    </div>
</template>