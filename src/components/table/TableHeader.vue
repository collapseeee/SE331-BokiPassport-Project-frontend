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
        <tr class="bg-brand-black text-brand-white flex flex-row w-full">
            <th class="font-normal text-center px-4 w-full" v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
    </thead>
</template>