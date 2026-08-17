<script lang="ts" setup>

const props = defineProps<{
    label: string
    routeName: string
}>()

</script>
<template>
    <RouterLink active-class="font-bold bg-brand-dark-blue" class="flex w-full h-16 gap-2 py-2 px-4 my-1 rounded-2xl hover:bg-brand-dark-blue/20 hover:cursor-pointer transition-all hover:shadow-lg items-center" :to="{ name: props.routeName }">
            <slot name="icon" />
            <p class="text-brand-white text-xl">{{ props.label }}</p>
    </RouterLink>
</template>