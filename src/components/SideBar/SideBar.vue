<script lang="ts" setup>

import { User, FaceGrinning } from '@lucide/vue';
import SideBarItem from './SideBarItem.vue';

const brandBlueColor = getComputedStyle(document.documentElement).getPropertyValue('--color-brand-blue');

const role = "USER";

</script>

<template>
    <div class="bg-brand-black h-full w-full p-6 border-r border-[#323232]">
        <div class="border-b border-brand-gray pb-4">
            <h1 class="text-brand-blue">Boki Passport</h1>
            <p class="text-brand-gray">Learn and Use AI</p>
        </div>
        <div class="mt-8">
            <!-- User SideBar Items -->
            <div v-if="role === 'USER'">
                <h3 class="text-brand-white mb-2">Profile</h3>
                <SideBarItem label="Profile" route-name="UserProfile">
                    <template #icon>
                        <User :color="brandBlueColor" />
                    </template>
                </SideBarItem>
                <SideBarItem label="Services & Benefits" route-name="UserServices">
                    <template #icon>
                        <FaceGrinning :color="brandBlueColor" />
                    </template>
                </SideBarItem>
            </div>
            <!-- Admin SideBar Items -->
            <div v-else-if="role === 'ADMIN'" class="gap-2">
                <h3 class="text-brand-white mb-2">Profile</h3>
                <SideBarItem label="Profile" route-name="UserProfile">
                    <template #icon>
                        <User :color="brandBlueColor" />
                    </template>
                </SideBarItem>
                <SideBarItem label="Services & Benefits" route-name="UserServices">
                    <template #icon>
                        <FaceGrinning :color="brandBlueColor" />
                    </template>
                </SideBarItem>
            </div>
        </div>
    </div>
</template>
