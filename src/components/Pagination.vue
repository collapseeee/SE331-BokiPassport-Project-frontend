<script setup lang="ts">
import { ChevronLeft, ChevronRight } from '@lucide/vue';
import { ref } from 'vue';

const page = ref(1)
const buttonClass = 'hover:bg-brand-black rounded-lg size-8 transition-colors'
</script>



<template>
    <div class="flex justify-between text-brand-white items-center px-5 pt-5 w-full">
        <p class="text-sm">Showing {{ 1 }} of {{ 1 }}</p>
        <div class="flex items-center gap-x-5">
            <RouterLink :to="{ query: { page: '' } }">
                <ChevronLeft :class="buttonClass"/>
            </RouterLink>
            <input maxlength="3" v-model="page" class="p-2 size-10 items-center text-center truncate bg-white text-brand-black"/>
            <RouterLink :to="{ query: { page: '' } }">
                <ChevronRight :class="buttonClass"/>
            </RouterLink>
        </div>
    </div>
</template>