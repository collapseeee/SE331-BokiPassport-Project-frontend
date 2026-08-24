<script lang="ts" setup>
import UserProfileCard from '@/components/profile/UserProfileCard.vue';
import { ChevronLeft } from '@lucide/vue';


const linkClasses = 'bg-brand-blue hover:bg-brand-blue/60 font-bold hover:shadow-sm text-lg text-brand-white p-4 rounded-xl transition-all'
const linkActiveClasses = 'bg-brand-blue/40 shadow-lg font-medium'
</script>

<template>
    <div class="px-4 py-12 flex flex-col gap-5 items-center relative">
        <ChevronLeft v-if="$route.name?.toString().startsWith('Admin')" @click="$router.push({ name: 'AdminUserManagement'})" class="self-start cursor-pointer size-8 hover:text-brand-dark-red hover:bg-brand-light-blue/30 rounded-full transition-all"/>
        <UserProfileCard/>
        <div class="flex flex-row gap-x-4">
            <RouterLink 
                :to="{
                    name: $route.name?.toString().startsWith('Admin') ? 'AdminUserProfileBadgesView' : 'UserProfileBadgesView',
                    params: { id: $route.name?.toString().startsWith('Admin') ? $route.params.id : null }
                    }" 
                    :class="linkClasses" :exact-active-class="linkActiveClasses">
                    BADGE
                </RouterLink>
            <RouterLink 
                :to="{
                    name: $route.name?.toString().startsWith('Admin') ? 'AdminUserProfileExamHistoryView' : 'UserProfileExamHistoryView',
                    params: { id: $route.name?.toString().startsWith('Admin') ? $route.params.id : null }
                    }"
                    :class="linkClasses" :exact-active-class="linkActiveClasses">
                    EXAM
            </RouterLink>
        </div>
        <RouterView/>
    </div>
</template>
