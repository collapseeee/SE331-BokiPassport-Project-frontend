<script lang="ts" setup>
import Button from '@/components/Button.vue';
import VideoCard from '@/components/cards/VideoCard.vue';
import { useRouter } from 'vue-router';

const linkClasses = 'bg-brand-blue hover:bg-brand-blue/60 font-bold hover:shadow-sm text-lg text-brand-white px-4 py-2 rounded-xl transition-all hover:scale-105 duration-300'
const linkActiveClasses = 'bg-brand-blue/40 shadow-lg font-medium'

const router = useRouter()
const handleAdd = () => {
    router.go(0) // Just refresh the page. Nothing special.
}
</script>

<template>
    <div class="p-5 flex flex-col gap-y-2">
        <h2>Course Management</h2>
        <p>Boki Passport course management system</p>
        <div class="flex flex-row justify-between">
            <div class="flex gap-x-4">
                <RouterLink :class="[linkClasses, $route.query.level === 'all' ? linkActiveClasses : '']" :to="{ query: { level: 'all' }}">ALL</RouterLink>
                <RouterLink :class="[linkClasses, $route.query.level === '1' ? linkActiveClasses : '']" :to="{ query: { level: '1' }}">LEVEL 1</RouterLink>
                <RouterLink :class="[linkClasses, $route.query.level === '2' ? linkActiveClasses : '']" :to="{ query: { level: '2' }}">LEVEL 2</RouterLink>
                <RouterLink :class="[linkClasses, $route.query.level === '3' ? linkActiveClasses : '']" :to="{ query: { level: '3' }}">LEVEL 3</RouterLink>
                <RouterLink :class="[linkClasses, $route.query.level === '4' ? linkActiveClasses : '']" :to="{ query: { level: '4' }}">LEVEL 4</RouterLink>
            </div>
            <Button @click="handleAdd" isBold label="ADD">Hello</Button>
        </div>
        <div class="grid grid-cols-4 w-full">
            <VideoCard v-for="course in [{ id: 1, createdAt: new Date(), videoUrl: 'https://www.youtube.com/watch?v=omB2JkC4QfA', name: 'CICD', description: 'CICDDAWODMIAWMOIDMdwadkawjndanwikjdnawjkdnawjndajkwdAOWD', levelId: 1 }]" :key="course.id" :course="course"/>
        </div>
    </div>
</template>
