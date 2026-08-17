<script lang="ts" setup>
import { ChevronDown } from '@lucide/vue';
import { ref } from 'vue';

const isOpen = ref(false)
const toggleDropdown = () => {
    isOpen.value = !isOpen.value
};
</script>

<template>
    <div class="relative">
        <div class="w-fit h-fit flex cursor-pointer py-2 px-4 items-center gap-2 bg-brand-gray rounded-4xl border border-brand-blue hover:bg-gray-300" @click="toggleDropdown">
            <slot name="trigger"/>
            <ChevronDown 
                color="#00A1EE"
                class="duration-100"
                :class="{ 'rotate-180': isOpen }"
            />
        </div>
        <div class="absolute top-full z-50 right-0 mt-2 h-fit w-full bg-brand-white border border-brand-blue rounded-xl shadow-2xl" v-if="isOpen">
            <slot name="content"/>
        </div>
    </div>
</template>
