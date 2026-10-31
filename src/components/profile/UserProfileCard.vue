<script setup lang="ts">
import { onMounted, ref } from 'vue';
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
import { UserRound } from '@lucide/vue';
import PostOperationModal from '@/components/modal/PostOperationModal.vue';


const route = useRoute()
const authStore = useAuthStore()

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

/* Handle reactivate/deactivate user */
const isReactivateModalOpen = ref(false)
const isDeactivateModalOpen = ref(false)
const handleReactivateUser = async () => {
    if (!user.value?.id) return
    try {
        await UserService.reactivateUser(user.value.id)
        isReactivateModalOpen.value = false
        isActive.value = true

        operationMsg.value = 'User Reactivation'
        successMsg.value = `${user?.value.firstName} ${user?.value.lastName} reactivated successfully.`
        isSuccess.value = true
        isPostModalOpen.value = true
    } catch (err) {
        console.error('Failed to reactivate the user', err)

        isReactivateModalOpen.value = false
        operationMsg.value = 'User Reactivation'
        isSuccess.value = false
        isPostModalOpen.value = true
    }
}

const handleDeactivateUser = async () => {
    if (!user.value?.id) return
    try {
        await UserService.deactivateUser(user.value.id)
        isDeactivateModalOpen.value = false
        isActive.value = false

        operationMsg.value = 'User Deactivation'
        successMsg.value = `${user?.value.firstName} ${user?.value.lastName} deactivated successfully.`
        isSuccess.value = true
        isPostModalOpen.value = true
    } catch (err) {
        console.error('Failed to reactivate the user', err)

        isReactivateModalOpen.value = false
        operationMsg.value = 'User Deactivation'
        isSuccess.value = false
        isPostModalOpen.value = true
    }
}

const handleOpenReactivateModal = () => isReactivateModalOpen.value = true
const handleOpenDeactivateModal = () => isDeactivateModalOpen.value = true
const handleCloseReactivateModal = () => isReactivateModalOpen.value = false
const handleCloseDeactivateModal = () => isDeactivateModalOpen.value = false

// Post Operation Modal state
const isPostModalOpen = ref(false)
const isSuccess = ref(true)
const operationMsg = ref('')
const successMsg = ref('')

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
    <PostOperationModal 
        v-model="isPostModalOpen" 
        :operationMsg="operationMsg" 
        :success="isSuccess" 
        :successMsg="successMsg" 
    />
    <ModalContainer v-model="isDeactivateModalOpen">
        <div class="flex flex-col gap-y-4">
            <h2>Deactivate User?</h2>
            <p>Are you sure that you want to deactivate {{ user?.firstName + ' ' + user?.lastName }}?</p>
            <div class="w-full flex flex-row gap-x-2 justify-between">
                <Button @click="handleCloseDeactivateModal" bg-color="brand-white" class="text-brand-black! w-full!" label="Cancel"/>
                <Button @click="handleDeactivateUser" bg-color="brand-red" class="w-full!" label="Deactivate"/>
            </div>
        </div>
    </ModalContainer>
    <ModalContainer v-model="isReactivateModalOpen">
        <div class="flex flex-col gap-y-4">
            <h2>Re-activate User?</h2>
            <p>Are you sure that you want to reactivate {{ user?.firstName + ' ' + user?.lastName }}?</p>
            <div class="w-full flex flex-row gap-x-2 justify-between">
                <Button @click="handleCloseReactivateModal" bg-color="brand-white" class="text-brand-black! w-full!" label="Cancel"/>
                <Button @click="handleReactivateUser" bg-color="brand-green" class="w-full!" label="Reactivate"/>
            </div>
        </div>
    </ModalContainer>
    <CardContainer class="md:w-2/3 lg:w-1/2 relative">
        <div v-if="isAdmin" class="absolute left-0 top-0 p-5">
            <Button v-if="isActive" @click="handleOpenDeactivateModal" bgColor="brand-red" label="Deactivate"/>
            <Button v-else @click="handleOpenReactivateModal" bgColor="brand-green" label="Re-activate"/>
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
                <Button 
                    label="Edit Profile" 
                    :to="{ name: isAdmin ? 'AdminUserProfileEditView' : 'UserProfileEditView', params: { id: route.params.id } }" 
                    :disabled="route.path.includes('edit')" 
                />
            </div>

            <!-- Right side of card -->
            <div class="w-full" v-if="benefits">
                <p class="text-xl font-bold">Services</p>
                <BenefitItem :isEligible="true" v-for="benefit in benefits" :benefit="benefit" :key="benefit.id"/>
            </div>
        </div>
    </CardContainer>
</template>