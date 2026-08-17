<script lang="ts" setup>
import Dropdown from '@/components/dropdown/Dropdown.vue';
import { role, name, imgUrl, level} from '@/stores/user'
import DropdownItem from './dropdown/DropdownItem.vue';
import Button from './Button.vue';

const nameText = role === 'USER' ? name : 'Admin'
const levelText = role === 'USER' ? 'Level ' + level : 'Super User'
const logout = (() => {
    alert("Logged Out Complete!")
})
</script>

<template>
    <div class="bg-brand-black w-full h-fit py-2 px-12">
        <div class="flex justify-end items-center">
            <div v-if="role === 'USER' || role === 'ADMIN'">
                <Dropdown>
                    <template #trigger>
                        <div class="flex">
                        <img class="w-12 h-12 rounded-full border border-brand-blue" :src="imgUrl">
                        <div class="flex flex-col px-2">
                            <p class="text-brand-blue font-bold">{{ nameText }}</p>
                            <p class="text-brand-blue font-medium text-sm">{{ levelText }}</p>
                        </div>
                    </div>
                    </template>
                    <template #content>
                        <DropdownItem label="Badges" toName="UserProfileBadgesView"></DropdownItem>
                        <DropdownItem label="Exam History" toName="UserProfileExamHistoryView"></DropdownItem>
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
