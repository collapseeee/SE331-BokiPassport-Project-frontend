<script setup lang="ts">
import { useAttrs } from 'vue'
import { Lock, MoveLeftIcon, MoveRightIcon } from '@lucide/vue';

const attrs = useAttrs()
const props = withDefaults(defineProps<{
    label: string
    bgColor?: string
    textColor?: string
    isBold? : boolean
    toName?: string
    leftArrow?: boolean
    rightArrow?: boolean
    disable?: boolean
    locked?: boolean
}>(), {
    leftArrow: false,
    rightArrow: false,
    disable: false,
    locked: false
})

const bgColorClass = props.bgColor ? 'bg-' + props.bgColor : 'bg-brand-blue';
const textColorClass = props.textColor? 'text-' + props.textColor : 'text-white';
const boldClass = props.isBold ? 'font-bold' : 'font-medium';
const disableStyle = props.disable ? 'cursor-not-allowed opacity-50' : 'cursor-pointer';
let paddingClass = 'px-4 py-2'
if (props.leftArrow) paddingClass = 'py-2 pl-10 pr-4'
if (props.rightArrow) paddingClass = 'py-2 pl-4 pr-10'
if (props.leftArrow && props.rightArrow) paddingClass = 'py-2 px-10'
</script>

<template>
    <div v-if="props.locked" class="relative hover:scale-105 duration-300">
        <button class="bg-brand-dark-blue text-brand-blue rounded-2xl w-full flex items-center justify-center cursor-not-allowed" :class="paddingClass"><Lock/></button>
    </div>
    <div v-else class="relative hover:scale-105 duration-300">
        <span v-if="props.leftArrow" class="absolute inset-y-0 left-3 flex items-center text-brand-black">
            <MoveLeftIcon :class="textColorClass" />
        </span>
        <router-link v-if="props.toName" :to="{ name: props.toName}">
            <button v-bind="attrs" class="rounded-2xl w-full" :class="[bgColorClass, textColorClass, boldClass, paddingClass, disableStyle]" :disabled="disable">{{ props.label }}</button>
        </router-link>
        <button v-else v-bind="attrs" class="rounded-2xl w-full" :class="[bgColorClass, textColorClass, boldClass, paddingClass, disableStyle]" :disabled="disable">{{ props.label }}</button>
        <span v-if="props.rightArrow" class="absolute inset-y-0 right-3 flex items-center text-brand-black">
            <MoveRightIcon :class="textColorClass" />
        </span>
    </div>
</template>