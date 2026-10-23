<script lang="ts" setup>
import AdminHeader from '@/components/AdminHeader.vue';
import DashboardCard from '@/components/cards/DashboardCard.vue';
import courseService from '@/services/courseService';
import UserService from '@/services/UserService';
import SubCardContainer from '@/components/cards/SubCardContainer.vue';
import type { Course, DashboardItem, User as UserType} from '@/types';
import { ClipboardList, User, UserRoundCheck, UserRoundX } from '@lucide/vue';
import { computed, onMounted, ref } from 'vue';

const userService = UserService;
const userCount = ref<number>(0);
const userLvl1Count = ref<number>(0);
const userLvl2Count = ref<number>(0);
const userLvl3Count = ref<number>(0);
const userLvl4Count = ref<number>(0);

const useCourseService = courseService;
const courseCount = ref<number>(0);
const courseLvl1Count = ref<number>(0);
const courseLvl2Count = ref<number>(0);
const courseLvl3Count = ref<number>(0);
const courseLvl4Count = ref<number>(0);

const activeUserCount = ref<number>(0);
const inactiveUserCount = ref<number>(0);

onMounted(async () => {
    const allUsers: UserType[] = await userService.getMockUsers() || [];
    const regularUsers = allUsers.filter((user: UserType) => user.roles.includes('ROLE_ADMIN'));

    userCount.value = regularUsers.length;
    userLvl1Count.value = regularUsers.filter((user: UserType) => Number(Math.max(...user.levels.map((l) => l.id))) === 1).length;
    userLvl2Count.value = regularUsers.filter((user: UserType) => Number(Math.max(...user.levels.map((l) => l.id))) === 2).length;
    userLvl3Count.value = regularUsers.filter((user: UserType) => Number(Math.max(...user.levels.map((l) => l.id))) === 3).length;
    userLvl4Count.value = regularUsers.filter((user: UserType) => Number(Math.max(...user.levels.map((l) => l.id))) === 4).length;

    activeUserCount.value = regularUsers.filter((user: UserType) => user.isActive === true).length;
    inactiveUserCount.value = userCount.value - activeUserCount.value;

    const response = await useCourseService.getCourses();
    const allCourses: Course[] = response.data || [];
    courseCount.value = allCourses.length;
    courseLvl1Count.value = allCourses.filter((course: Course) => Number(course.level.id) === 1).length;
    courseLvl2Count.value = allCourses.filter((course: Course) => Number(course.level.id) === 2).length;
    courseLvl3Count.value = allCourses.filter((course: Course) => Number(course.level.id) === 3).length;
    courseLvl4Count.value = allCourses.filter((course: Course) => Number(course.level.id) === 4).length;
})

const usersDashboardHeader = computed<DashboardItem>(() => {
    return { key: 'Users', value: userCount.value }
})

const usersDashboardItems = computed<DashboardItem[]>(() => {
    return [
        { key: 'Level 1', value: userLvl1Count.value },
        { key: 'Level 2', value: userLvl2Count.value },
        { key: 'Level 3', value: userLvl3Count.value },
        { key: 'Level 4', value: userLvl4Count.value }
    ]
})

const coursesDashboardHeader = computed<DashboardItem>(() => {
    return { key: 'Courses', value: courseCount.value }
})

const coursesDashboardItems = computed<DashboardItem[]>(() => {
    return [
        { key: 'Level 1', value: courseLvl1Count.value },
        { key: 'Level 2', value: courseLvl2Count.value },
        { key: 'Level 3', value: courseLvl3Count.value },
        { key: 'Level 4', value: courseLvl4Count.value }
    ]
})
</script>

<template>
    <div>
        <AdminHeader title="Boki Passport Overview" description="Insight of users, and courses."/>
        <div class="grid grid-cols-2 gap-4 px-8 pb-8">
            <SubCardContainer class="border border-gray-300 rounded-xl shadow-lg bg-brand-white p-4 gap-4 flex flex-row justify-between">
                <div class="flex justify-between items-center w-full">
                    <div class="flex flex-row items-center gap-2">
                        <UserRoundCheck class="text-brand-green"/>
                        <h4>Active Users: </h4>
                    </div>
                    <h2>{{ activeUserCount }}</h2>
                </div>
            </SubCardContainer>
            <SubCardContainer class="border border-gray-300 rounded-xl shadow-lg bg-brand-white p-4 gap-4 flex flex-row justify-between">
                <div class="flex justify-between items-center w-full">
                    <div class="flex flex-row items-center gap-2">
                        <UserRoundX class="text-brand-red"/>
                        <h4>Inactive Users: </h4>
                    </div>
                    <h2>{{ inactiveUserCount }}</h2>
                </div>
            </SubCardContainer>
            <DashboardCard :icon="User" :header="usersDashboardHeader" :value="usersDashboardItems" />
            <DashboardCard :icon="ClipboardList" :header="coursesDashboardHeader" :value="coursesDashboardItems" />
        </div>
    </div>
</template>
