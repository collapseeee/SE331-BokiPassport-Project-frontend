<script setup lang="ts">
import TableBody from './TableBody.vue';
import TableHeader from './TableHeader.vue';
defineProps({
    headers: {
        type: Array<string>,
        required: true
    }
})
</script>


<template>
    <table class="w-full">
        <TableHeader :headers="headers"/>
        <TableBody/>
    </table>
</template>