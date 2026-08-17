<script setup lang="ts">
import CardContainer from './CardContainer.vue';
import { computed, type Component } from 'vue';

const props = defineProps<{
    icon: Component
    title: string
    description: string
    iconSize?: 'sm' | 'md' | 'lg' | 'xl'
    iconColor?: string
}>()

const sizeMap = {
    sm: 'w-16 h-16 p-3 mb-1',
    md: 'w-20 h-20 p-4 mb-2',
    lg: 'w-24 h-24 p-5 mb-4',
    xl: 'w-28 h-28 p-6 mb-6',
}
const iconColorClass = computed(() => {
    return props.iconColor ? `text-${props.iconColor}` : 'text-brand-black'
})

</script>
<template>
    <CardContainer>
        <div class="rounded-full bg-brand-white" :class="sizeMap[props.iconSize || 'md']">
            <component :is="props.icon" class="w-full h-full" :class="iconColorClass" />
        </div>
        <h3 class="text-brand-black">{{ props.title }}</h3>
        <p class="text-brand-black">{{ props.description }}</p>
    </CardContainer>
</template>