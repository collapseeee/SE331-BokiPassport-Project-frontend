<script setup lang="ts">
import SelectInput from './select/SelectInput.vue';

const emit = defineEmits(['select-province'])
defineProps<{
    options: Array<string>
}>()

const handleChange = (province: string) => {
    emit('select-province', province)
}


</script>

<template>
    <SelectInput @change="handleChange" :options="options" name="province"/>
</template>