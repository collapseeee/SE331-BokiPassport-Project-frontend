<script setup lang="ts">
import { ref, watch } from 'vue';

const isOpen = ref(true);
watch(isOpen, (val) => {
    if (val) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});
const closeModal = (() => {
    isOpen.value = false;
});

</script>

<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-gray-900/20 backdrop-blur-xs select-none">
        <div class="relative w-fit bg-brand-gray rounded-xl shadow-2xl overflow-hidden my-8 flex flex-col items-center py-8 px-12">
            <slot :close="closeModal"></slot>
        </div>
    </div>
</template>
