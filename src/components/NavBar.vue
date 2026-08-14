<script lang="ts" setup>
import Dropdown from '@/components/dropdown/Dropdown.vue';
import { role, name, imgUrl, level} from '@/stores/user'
import DropdownItem from './dropdown/DropdownItem.vue';

const nameText = role === 'USER' ? name : 'Admin'
const levelText = role === 'USER' ? 'Level ' + level : 'Super User'
const logout = (() => {
    alert("Logged Out Complete!")
})
</script>

<template>
    <div class="bg-brand-black w-full h-fit py-4 px-8">
        <div class="flex justify-end items-center">
            <Dropdown>
                <template #trigger>
                    <div class="flex gap-2">
                    <img class="w-14 h-14 rounded-full border border-brand-blue" :src="imgUrl">
                    <div class="flex flex-col px-2">
                        <h5 class="text-brand-blue">{{ nameText }}</h5>
                        <p class="text-brand-blue font-medium">{{ levelText }}</p>
                    </div>
                </div>
                </template>
                <template #content>
                    <DropdownItem label="Badges" to-name="UserProfileBadgesView"></DropdownItem>
                    <DropdownItem label="Exam History" to-name="UserProfileExamHistoryView"></DropdownItem>
                    <DropdownItem label="Log Out" class="text-brand-red" @click="logout"></DropdownItem>
                </template>
            </Dropdown>
        </div>
    </div>
</template>
