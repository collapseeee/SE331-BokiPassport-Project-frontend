<script setup lang="ts">
import CardContainer from './CardContainer.vue';
import { computed, type Component } from 'vue';

const props = defineProps<{
    icon: Component
    title: string
    description: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
    iconColor?: string
}>()

const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
    xl: 'w-28 h-28',
}
const iconColorClass = computed(() => {
    return props.iconColor ? `text-${props.iconColor}` : 'text-brand-black'
})

</script>
<template>
    <CardContainer>
        <div class="rounded-full bg-brand-white p-6 mb-6" :class="sizeMap[props.size || 'md']">
            <component :is="props.icon" class="w-full h-full" :class="iconColorClass" />
        </div>
        <h3 class="text-brand-black">{{ props.title }}</h3>
        <p class="text-brand-black">{{ props.description }}</p>
    </CardContainer>
</template>