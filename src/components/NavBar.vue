<script lang="ts" setup>
import Dropdown from '@/components/dropdown/Dropdown.vue';
import DropdownItem from './dropdown/DropdownItem.vue';
import Button from './Button.vue';
import { useAuthStore } from '@/stores/auth.ts';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useLevelsStore } from '@/stores/levels.ts';

const authStore = useAuthStore();
const levelStore = useLevelsStore();
const router = useRouter();

const nameText = computed(() => authStore.isUser ? authStore.fullName : 'Admin')
const levelText = computed(() => authStore.isUser ? levelStore.getLevelById(Number(authStore.level))?.name : 'Super User')
const logout = (() => {
    authStore.logout()
    router.go(0)
})
</script>

<template>
    <div class="bg-brand-black w-full h-fit py-2 px-12 sticky top-0 z-40 border-b border-brand-gray">
        <div class="flex justify-end items-center">
            <div v-if="authStore.isAdmin || authStore.isUser">
                <Dropdown>
                    <template #trigger>
                        <div class="flex">
                        <img class="w-12 h-12 rounded-full border border-brand-blue" :src="authStore.image">
                        <div class="flex flex-col px-2">
                            <p class="text-brand-blue font-bold">{{ nameText }}</p>
                            <p class="text-brand-blue font-medium text-sm">{{ levelText }}</p>
                        </div>
                    </div>
                    </template>
                    <template #content>
                        <DropdownItem v-if="!authStore.isAdmin" label="Badges" toName="UserProfileBadgesView"></DropdownItem>
                        <DropdownItem v-if="!authStore.isAdmin" label="Exam History" toName="UserProfileExamHistoryView"></DropdownItem>
                        <DropdownItem label="Log Out" class="text-brand-red" @click="logout"></DropdownItem>
                    </template>
                </Dropdown>
            </div>
            <div v-else class="flex gap-x-10 items-center w-full justify-between">
                <h1 class="text-brand-blue">Boki Passport</h1>
                <div class="flex gap-x-12 items-center">
                    <a href="#footer" class="text-brand-white underline">About Us</a>
                    <Button label="Log in" to-name="Login" class="w-fit"></Button>
                </div>
            </div>
        </div>
    </div>
</template>
