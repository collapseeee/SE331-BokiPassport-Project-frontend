<script lang="ts" setup>
import UserProfileCard from '@/components/profile/UserProfileCard.vue';


const linkClasses = 'bg-brand-blue hover:bg-brand-blue/60 font-bold hover:shadow-sm text-lg text-brand-white p-4 rounded-xl transition-all'
const linkActiveClasses = 'bg-brand-blue/40 shadow-lg font-medium'
</script>

<template>
    <div class="px-4 py-12 flex flex-col gap-5 items-center">
        <UserProfileCard/>
        <div class="flex flex-row gap-x-4">
            <RouterLink :to="{ name: 'UserProfileBadgesView' }" :class="linkClasses" :exact-active-class="linkActiveClasses">BADGE</RouterLink>
            <RouterLink :to="{ name: 'UserProfileExamHistoryView' }" :class="linkClasses" :exact-active-class="linkActiveClasses">EXAM</RouterLink>
        </div>
        <RouterView/>
    </div>
</template>
