<script lang="ts" setup>
const props = defineProps<{
    label: string
    toName?: string
}>();
</script>
<template>
    <div class="text-center text-brand-black font-medium py-2.5 hover:bg-brand-gray first:rounded-t-xl last:rounded-b-xl cursor-pointer border-b border-brand-black last:border-b-0  ">
        <RouterLink v-if="toName" :to="{ name: toName }">
            {{ props.label }}
        </RouterLink>
        <p v-else>{{ props.label }}</p>
    </div>
</template>