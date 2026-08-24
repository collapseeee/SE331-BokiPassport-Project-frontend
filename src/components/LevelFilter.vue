<script setup lang="ts">

const linkClasses = 'bg-brand-blue hover:bg-brand-blue/60 font-bold hover:shadow-sm text-lg text-brand-white px-4 py-2 rounded-xl transition-all hover:scale-105 duration-300'
const linkActiveClasses = 'bg-brand-blue/40 shadow-lg font-medium'
</script>

<template>
    <div class="flex gap-x-4">
        <RouterLink :class="[linkClasses, $route.query.level === 'all' ? linkActiveClasses : '']" :to="{ query: { level: 'all' }}">ALL</RouterLink>
        <RouterLink :class="[linkClasses, $route.query.level === '1' ? linkActiveClasses : '']" :to="{ query: { level: '1' }}">LEVEL 1</RouterLink>
        <RouterLink :class="[linkClasses, $route.query.level === '2' ? linkActiveClasses : '']" :to="{ query: { level: '2' }}">LEVEL 2</RouterLink>
        <RouterLink :class="[linkClasses, $route.query.level === '3' ? linkActiveClasses : '']" :to="{ query: { level: '3' }}">LEVEL 3</RouterLink>
        <RouterLink :class="[linkClasses, $route.query.level === '4' ? linkActiveClasses : '']" :to="{ query: { level: '4' }}">LEVEL 4</RouterLink>
    </div>
</template>