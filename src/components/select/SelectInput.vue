<script setup lang="ts">
import { ChevronDown } from '@lucide/vue';
import { useId } from 'vue';
interface SelectInputProps {
    label?: string
    name: string
    options: Array<string>
}
const id = useId()
const props = withDefaults(defineProps<SelectInputProps>(), {
    label: ''
})
const emit = defineEmits(['update-value'])

const updateModelValue = () => {
    emit('update-value', modelValue.value)
}
const modelValue = defineModel<string>()
</script>

<template>
    <div class="flex flex-col w-full max-w-64">
        {{ props.label }}
        <div class="relative w-full">
            <select @change="updateModelValue"
                :id
                class="bg-brand-white h-12 w-full pl-3 text-md
                    appearance-none rounded-xl border border-gray-300 
                    focus:border-brand-blue focus:outline-none transition-colors 
                    truncate *:odd:bg-brand-gray *:last:rounded-2xl"
                v-model="modelValue"
                v-bind="$attrs"
            >
                <option value="" selected>All {{ name }}</option>
                <option v-for="option in props.options" :key="option" :value="option">
                    {{ option }}
                </option>
            </select>
            <div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 flex items-center">
                <ChevronDown class="w-5 h-5" />
            </div>
        </div>
    </div>
</template>