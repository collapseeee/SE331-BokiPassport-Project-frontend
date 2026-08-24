<script lang="ts" setup>

import { BookCheck, ChartColumn, UsersRound, Library, Flag } from '@lucide/vue';
import SideBarItem from './SideBarItem.vue';

const brandBlueColor = getComputedStyle(document.documentElement).getPropertyValue('--color-brand-blue');

</script>

<template>
    <div class="bg-brand-black h-screen z-50 sticky top-0 overflow-y-hidden w-full p-6 border-r border-[#323232]">
        <div class="border-b border-brand-gray pb-4 flex flex-col gap-y-2">
            <h1 class="text-brand-blue">Boki Passport</h1>
            <p class="text-brand-gray">Management Page</p>
        </div>
        <div class="mt-8">
            <SideBarItem label="Overview" route-name="AdminDashboard">
                <template #icon>
                    <ChartColumn :color="brandBlueColor" />
                </template>
            </SideBarItem>
            <SideBarItem label="User Management" route-name="AdminUserManagement">
                <template #icon>
                    <UsersRound :color="brandBlueColor" />
                </template>
            </SideBarItem>
            <SideBarItem label="Course Management" route-name="AdminCourseManagement">
                <template #icon>
                    <Library :color="brandBlueColor" />
                </template>
            </SideBarItem>
            <SideBarItem label="Exam Management" route-name="AdminExamManagement">
                <template #icon>
                    <BookCheck :color="brandBlueColor" />
                </template>
            </SideBarItem>
            <SideBarItem label="Level Management" route-name="AdminLevelManagement">
                <template #icon>
                    <Flag :color="brandBlueColor" />
                </template>
            </SideBarItem>
        </div>
    </div>
</template>
