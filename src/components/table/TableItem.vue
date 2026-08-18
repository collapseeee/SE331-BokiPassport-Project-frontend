<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    columns: {
        type: Object,
        required: true
    }
})

/* Filter out the object with 'id' to not let it consume a column */
const visibleColumns = computed(() => {
    return Object.fromEntries(
        Object.entries(props.columns)
                .filter(([key,value]) => {
                    if (key !== 'id') return value
                })
    )
})
</script>

<template>
    <tr>
        <td class="px-4 py-2" v-for="(value,  key) in visibleColumns" :key="key">{{ value }}</td>
    </tr>
</template>