<script lang="ts" setup>

const props = defineProps<{
    label: string
    routeName: string
}>()

</script>
<template>
    <RouterLink :to="{ name: props.routeName }">
        <div
            class="flex w-full h-16 gap-2 py-2 px-4 my-1 rounded-2xl hover:bg-brand-dark-blue hover:cursor-pointer transition hover:shadow-lg items-center">
            <slot name="icon" />
            <p class="text-brand-white text-xl">{{ props.label }}</p>
        </div>
    </RouterLink>
</template>