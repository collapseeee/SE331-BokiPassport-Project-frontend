<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CardContainer from '../cards/CardContainer.vue';
import BenefitItem from './BenefitItem.vue';
import type { Badge, Benefit, Profile } from '@/types.ts';
import BadgeService from '@/services/BadgeService.ts';
import { useRoute } from 'vue-router';
import UserService from '@/services/UserService.ts';
import { useAuthStore } from '@/stores/auth.ts';
import Button from '../Button.vue';
import { storeToRefs } from 'pinia';
import BenefitService from '@/services/BenefitService.ts';
const route = useRoute()
const authStore = useAuthStore()

const { isAdmin } = storeToRefs(authStore)
const benefits = ref<Benefit[] | null>(null)
const badges = ref<Badge[] | null>(null)
const user = ref<Profile | null>(null)
// the json-server mock still serves the admin's user management view
const isActive = ref(false)

const assignLevelBenefits = (level: number) => {
    BenefitService.getBenefitsByLevel(level)
        .then(res => benefits.value = res.data)
        .catch(() => benefits.value = null)
}
onMounted(() => {
    BadgeService.getBadges()
        .then(res => badges.value = res.data)
    
    /* Fetch user data based on Admin's route or User's route */
    if (route.params.id) {
        UserService.getUser(Number(route.params.id))
            .then(res => {
            })
    } else {
        user.value = authStore.user
        assignLevelBenefits(Number(authStore.level))
    }
})

</script>

<template>
    <CardContainer class="md:w-2/3 lg:w-1/2 relative">
        <div v-if="isAdmin" class="absolute left-0 top-0 p-5">
            <Button v-if="isActive" bgColor="brand-red" label="Deactivate"/>
            <Button v-else bgColor="brand-green" label="Re-activate"/>
        </div>
        <div class="flex flex-row gap-x-10 w-full relative">
            <!-- Left side of card -->
            <div class="w-1/2 flex flex-col gap-y-2">
                <div class="flex flex-col items-center">
                    <img class="rounded-full border-2 border-sky-500 size-24" :src="user?.image" alt="">
                    <p class="text-xl/7 font-bold">{{  user?.firstName + ' ' + user?.lastName }}</p>
                    <p class="text-md text-mist-800">{{ user?.username }}</p>
                    <div class="grid grid-cols-2 text-lg gap-x-3">
                        <p class="text-start">Province:</p>
                        <p class="font-bold text-end truncate"> {{ user?.province }}</p>
                        <p v-if="isAdmin" class="text-start">Status:</p>
                        <p v-if="isAdmin" :class="{'text-brand-green': isActive, 'text-brand-red': !isActive}" class="text-center font-semibold">{{ isActive ? 'Active' : 'Inactive' }}</p>
                    </div>
                </div>
                <div class="grid grid-cols-2 w-full border items-center rounded-xl px-5 py-2 bg-sky-950">
                    <p class="text-mist-50">Level:</p>
                    <p class="text-sky-400 font-bold text-2xl text-right">{{ authStore.level }}</p>
                    <p class="text-mist-50">Badges:</p>
                    <p class="text-sky-400 font-bold text-2xl text-right">{{ user?.badges.length ?? 0 }} / {{ badges?.length }}</p>
                </div>
            </div>

            <!-- Right side of card -->
            <div class="w-1/2" v-if="benefits">
                <p class="text-xl font-bold">Services</p>
                <BenefitItem :isEligible="true" v-for="benefit in benefits" :benefit="benefit" :key="benefit.id"/>
            </div>
        </div>
    </CardContainer>
</template>