<script setup lang="ts">
withDefaults(
   defineProps<{
    headers: Array<string>
   }>(), {
       headers: () => []
   }
)
</script>

<template>
    <thead>
        <tr class="bg-brand-black text-brand-white">
            <th class="font-normal text-left px-4" v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
    </thead>
</template>