<script setup lang="ts">
import CardPagination from './Pagination.vue';

defineProps({
    title: {
        type: String,
        required: true
    },
    isPagination: {
        type: Boolean,
        required: false
    }
})

</script>

<template>
    <div class="flex flex-col items-center bg-brand-dark-blue py-5 w-3/4 rounded-xl">
        <h3 class="text-brand-white w-full text-left pl-5 pb-4">{{ title }}</h3>
        <div class="w-full h-full bg-brand-white">
            <slot/>
        </div>
        <CardPagination v-if="isPagination"/>
    </div>
</template>