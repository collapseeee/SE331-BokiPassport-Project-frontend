<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import CardContainer from '../cards/CardContainer.vue';
import BenefitItem from './BenefitItem.vue';
import type { Badge, Benefit, Level, Profile } from '@/types.ts';
import BadgeService from '@/services/BadgeService.ts';
import { useRoute } from 'vue-router';
import UserService from '@/services/UserService.ts';
import { useAuthStore } from '@/stores/auth.ts';
import Button from '../Button.vue';
import { storeToRefs } from 'pinia';
import BenefitService from '@/services/BenefitService.ts';
import { getPresignedImageUrl } from '@/services/ImageService.ts';
import ModalContainer from '@/components/modal/ModalContainer.vue';
import ImageUpload from '@/components/form/ImageUpload.vue';
import { UserRound } from '@lucide/vue';

const route = useRoute()
const authStore = useAuthStore()
const isChangeImageOpen = ref(false)
const uploadedImages = ref<string[]>([])


const { isAdmin, user: authUser } = storeToRefs(authStore)
const benefits = ref<Benefit[] | null>(null)
const badges = ref<Badge[] | null>(null)
const userBadges = ref<Badge[] | null>(null)
const user = ref<Profile | null>(null)
const isActive = ref(false)
const userLevel = ref<number | null>(null)

const assignLevelBenefits = (level: number) => {
    BenefitService.getBenefitsByLevel(level)
        .then(res => benefits.value = res.data)
        .catch(() => benefits.value = null)
}

const assignUserBadges = (userId: number) => {
    if (user.value) {
        BadgeService.getBadgesByUserId(userId)
            .then(res => userBadges.value = res.data)
            .catch(() => userBadges.value = [])
    }
}

const handleProfileImageChange = async (filename: string) => {
    await UserService.updateUserImage(filename)

    authStore.updateProfileImage(filename)

    if (user.value) {
        user.value.image = await getPresignedImageUrl(filename)
    }

    isChangeImageOpen.value = false
    uploadedImages.value = []
}

watch(uploadedImages, (newImages: string[]) => {
    if (newImages.length > 0) {
        handleProfileImageChange(newImages[0]!)
    }
})

onMounted(() => {
    BadgeService.getBadges()
        .then(res => badges.value = res.data)
    
    /* Fetch user data based on Admin's route or User's route */
    if (route.params.id) {
        UserService.getUser(Number(route.params.id))
            .then(async (res) => {
                const u = res.data
                const imageSrc = await getPresignedImageUrl(u.image)
                user.value = {
                    id: u.id,
                    firstName: u.firstName,
                    lastName: u.lastName,
                    province: u.province,
                    image: imageSrc,
                    username: u.username,
                    roles: u.roles,
                    badges: u.badges,
                    levels: u.levels
                }
                isActive.value = u.isActive
                userLevel.value = Math.max(...u.levels.map((l: Level) => l.id))
                assignLevelBenefits(userLevel.value)
            })
    } else {
        ;(async () => {
            if (authUser.value) {
                const imageSrc = await getPresignedImageUrl(authUser.value.image)
                user.value = {
                    id: authUser.value.id,
                    firstName: authUser.value.firstName,
                    lastName: authUser.value.lastName,
                    province: authUser.value.province,
                    image: imageSrc,
                    username: authUser.value.username,
                    roles: authUser.value.roles,
                    badges: authUser.value.badges,
                    levels: authUser.value.levels
                }
                userLevel.value = authUser.value.levels.length 
                    ? Math.max(...authUser.value.levels.map((l: Level) => l.id)) 
                    : 1
                assignLevelBenefits(userLevel.value ?? 1)
                if (user.value) assignUserBadges(user.value.id)
            }
        })()
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
            <div class="w-full flex flex-col gap-y-2">
                <div class="flex flex-col items-center">
                    <div class="flex flex-col items-center relative">
                        <img v-if="user?.image" class="rounded-full border-2 border-sky-500 size-24" :src="user?.image" alt="">
                        <div v-else class="flex justify-center items-center size-24 rounded-full border border-brand-blue bg-gray-300">
                            <UserRound class="w-16 h-16 text-brand-dark-blue"/>
                        </div>
                        <button
                            type="button"
                            @click="isChangeImageOpen = true"
                            class="absolute bottom-0 bg-brand-blue text-white text-xs px-1 py-1 rounded-full hover:bg-brand-dark-blue"
                        >
                            Change Image
                        </button>
                    </div>
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
                    <p class="text-sky-400 font-bold text-2xl text-right">{{ user?.badges?.length ?? 0 }} / {{ badges?.length }}</p>
                </div>
            </div>

            <!-- Right side of card -->
            <div class="w-full" v-if="benefits">
                <p class="text-xl font-bold">Services</p>
                <BenefitItem :isEligible="true" v-for="benefit in benefits" :benefit="benefit" :key="benefit.id"/>
            </div>
        </div>
        <ModalContainer v-model="isChangeImageOpen">
            <ImageUpload v-model="uploadedImages" :max-size="2" @cancel="isChangeImageOpen = false" />
        </ModalContainer>
    </CardContainer>
</template>