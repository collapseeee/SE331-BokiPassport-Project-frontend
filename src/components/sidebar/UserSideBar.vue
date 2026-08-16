<script lang="ts" setup>

import { User, FaceGrinning, BookText, BookCheck } from '@lucide/vue';
import SideBarItem from './SideBarItem.vue';

const brandBlueColor = getComputedStyle(document.documentElement).getPropertyValue('--color-brand-blue');

</script>

<template>
    <div class="bg-brand-black h-full w-full p-6 border-r border-[#323232]">
        <div class="border-b border-brand-gray pb-4 flex flex-col gap-y-2">
            <h1 class="text-brand-blue">Boki Passport</h1>
            <p class="text-brand-gray">Learn and Use AI</p>
        </div>
        <div class="mt-8">
            <!-- Profile -->
            <div class="mb=2">
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
            <!-- Learning -->
            <div class="mb=2">
                <h3 class="text-brand-white mb-2">Learning</h3>
                <SideBarItem label="Courses" route-name="CourseList">
                    <template #icon>
                        <BookText :color="brandBlueColor" />
                    </template>
                </SideBarItem>
                <SideBarItem label="Examination" route-name="ExamList">
                    <template #icon>
                        <BookCheck :color="brandBlueColor" />
                    </template>
                </SideBarItem>
            </div>
        </div>
    </div>
</template>
