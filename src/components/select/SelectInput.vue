<script setup lang="ts">
import { ref } from 'vue';
import SelectInputItem from './SelectInputItem.vue';
import { ChevronDown } from '@lucide/vue';
defineProps<{
    options: Array<string>
    name: string
}>()
const emit = defineEmits(['change'])
const selectedValue = ref<string>('')

const isOpen = ref<boolean>(false)
const handleClick = () => {
    isOpen.value = !isOpen.value
}
const handleSelect = (newValue: string) => {
    selectedValue.value = newValue
    emit('change', newValue)
}

</script>

<template>
    <div class="bg-brand-white flex flex-col rounded-xl cursor-pointer relative" @click="handleClick">
        <div class="flex flex-row w-full items-center text-md px-3 py-2 rounded-xl hover:bg-brand-fade-blue transition-colors truncate">
            <p class="">{{ selectedValue !== '' ? selectedValue : `Select ${name}` }}</p>
            <ChevronDown/>
        </div>
        <div class="absolute flex flex-col top-full" v-if="isOpen">
            <SelectInputItem class="odd:bg-brand-gray even:bg-brand-white last:rounded-b-xl" :class="{ '!bg-brand-sky-blue font-bold' :selectedValue === option }" @select="handleSelect" v-for="option in options" :key="option" :name="option"/>
        </div>
    </div>
</template>