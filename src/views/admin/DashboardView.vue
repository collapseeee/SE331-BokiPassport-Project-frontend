<script lang="ts" setup>
import AdminHeader from '@/components/AdminHeader.vue';
import DashboardCard from '@/components/cards/DashboardCard.vue';
import courseService from '@/services/courseService';
import UserService from '@/services/UserService';
import SubCardContainer from '@/components/cards/SubCardContainer.vue';
import type { Course, DashboardMetrics, User as UserType} from '@/types';
import { ClipboardList, UserRoundCheck, UserRoundX } from '@lucide/vue';
import { computed, onMounted, ref } from 'vue';
import DoughnutChart from '@/components/charts/DoughnutChart.vue';
import type { ChartData } from 'chart.js';

const LEVEL_LABELS = ['Level 1', 'Level 2', 'Level 3', 'Level 4'];
const LEVEL_COLORS = ['#38bdf8', '#0284c7', '#1e3a8a', '#dc2626'];

const userCount = ref(0);
const activeCount = ref(0);
const courseCount = ref(0);
const userLevels = ref([0, 0, 0, 0]);
const courseLevels = ref([0, 0, 0, 0]);
const isLoaded = ref(false);

onMounted(async () => {
    const [userRes, courseRes] = await Promise.all([
        UserService.getUsers(10000, 1, { name: '', province: '', level: '' }), // High limit per page.
        courseService.getCourses()
    ]);
    const users: UserType[] = (userRes.data || []).filter((u: UserType) => !u.roles.includes('ROLE_ADMIN'));
    const courses: Course[] = courseRes.data || [];
    userCount.value = users.length;
    activeCount.value = users.filter(u => u.isActive).length;
    courseCount.value = courses.length;
    [1, 2, 3, 4].forEach((lvl, i) => {
        userLevels.value[i] = users.filter(u => {
            const userHighest = u.levels?.length ? Math.max(...u.levels.map(l => l.id)) : -1; // If empty -1.
            return userHighest === lvl;
        }).length;
        courseLevels.value[i] = courses.filter(c => Number(c.level.id) === lvl).length;
    });
    isLoaded.value = true;
});
// AI Metrics
const metrics = computed<DashboardMetrics>(() => ({
    userCount: userCount.value,
    levelCounts: { lvl1: userLevels.value[0]!, lvl2: userLevels.value[1]!, lvl3: userLevels.value[2]!, lvl4: userLevels.value[3]! },
    activeUsers: activeCount.value,
    inactiveUsers: userCount.value - activeCount.value,
    courseCount: courseCount.value
}));

// Charts
const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
        padding: 8
    },
    plugins: {
        legend: {
            position: 'bottom' as const,
            labels: {
                boxWidth: 12,
                padding: 12,
                font: {
                    size: 12
                }
            }
        }
    }
};
const statusChartData = computed<ChartData<'doughnut'>>(() => ({
    labels: ['Active Users', 'Inactive Users'],
    datasets: [
        {
            data: [metrics.value.activeUsers, metrics.value.inactiveUsers],
            backgroundColor: ['#22c55e', '#ef4444'], // Green for Active, Red for Inactive
            borderWidth: 2,
            borderColor: '#ffffff'
        }
    ]
}));
const userLevelChartData = computed<ChartData<'doughnut'>>(() => ({
    labels: LEVEL_LABELS,
    datasets: [
        {
            data: userLevels.value,
            backgroundColor: LEVEL_COLORS,
            borderWidth: 2,
            borderColor: '#ffffff'
        }
    ]
}));

// Cards
const toItems = (arr: number[]) => LEVEL_LABELS.map((key, i) => ({ key, value: arr[i] ?? 0 }));
</script>

<template>
    <AdminHeader title="Boki Passport Overview" description="Insight of users, and courses." class="px-8"/>
    <div class="flex flex-col gap-4 px-8 pb-4">
        <!-- Status & User Level Charts Row -->
        <SubCardContainer class="border border-gray-300 rounded-xl shadow-lg bg-brand-white px-8 grid grid-cols-1 md:grid-cols-2 items-start gap-4 w-full">
            <!-- Status -->
            <div class="flex flex-col items-center">
                <h3 class="font-bold text-brand-black text-lg mb-2">Account Status</h3>
                <div class="relative h-56 w-full flex justify-center items-center">
                    <DoughnutChart 
                        v-if="isLoaded" 
                            :chart-data="statusChartData" 
                        :chart-options="commonChartOptions" 
                    />
                    <span v-else class="text-brand-black">Loading chart...</span>
                    <div v-if="isLoaded" class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-4">
                        <span class="text-sm font-semibold text-brand-black tracking-wider">Total</span>
                        <span class="text-2xl font-bold text-black">{{ userCount }}</span>
                    </div>
                </div>
                <div class="flex flex-col justify-center gap-2">
                    <span class="flex flex-row items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold bg-emerald-50 text-emerald-700 border border-emerald-600">
                        <UserRoundCheck :size="16" />
                        Active: {{ metrics.activeUsers }} ({{ ((metrics.activeUsers/userCount)*100).toFixed(2) }}%)
                    </span>
                    <span class="flex flex-row items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold bg-red-50 text-red-700 border border-red-600">
                        <UserRoundX :size="16" />
                        Inactive: {{ metrics.inactiveUsers }} ({{ ((metrics.inactiveUsers/userCount)*100).toFixed(2) }}%)
                    </span>
                </div>
            </div>
            <!-- Level -->
            <div class="flex flex-col items-center">
                <h3 class="font-bold text-brand-black text-lg mb-2">User Level Distribution</h3>
                <div class="relative h-56 w-full flex justify-center items-center">
                    <DoughnutChart 
                        v-if="isLoaded" 
                        :chart-data="userLevelChartData" 
                        :chart-options="commonChartOptions" 
                    />
                    <span v-else class="text-brand-black">Loading chart...</span>
                    <div v-if="isLoaded" class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-4">
                        <span class="text-sm font-semibold text-brand-black tracking-wider">Total</span>
                        <span class="text-2xl font-bold text-black">{{ userCount }}</span>
                    </div>
                </div>
                <div class="flex flex-col justify-center gap-2">
                    <div class="flex flex-row gap-2">
                        <span class="flex flex-row items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold bg-sky-50 text-sky-700 border border-sky-600">
                            <span class="size-2.5 rounded-full bg-sky-400"></span>
                            Level 1: {{ userLevels[0] }} ({{ (((userLevels[0] ?? 0) / (userCount || 1)) * 100).toFixed(1) }}%)
                        </span>
                        <span class="flex flex-row items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold bg-blue-50 text-blue-700 border border-blue-600">
                            <span class="size-2.5 rounded-full bg-blue-600"></span>
                            Level 2: {{ userLevels[1] }} ({{ (((userLevels[1] ?? 0) / (userCount || 1)) * 100).toFixed(1) }}%)
                        </span>
                    </div>
                    <div class="flex flex-row gap-2">
                        <span class="flex flex-row items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold bg-indigo-50 text-indigo-800 border border-indigo-700">
                            <span class="size-2.5 rounded-full bg-indigo-800"></span>
                            Level 3: {{ userLevels[2] }} ({{ (((userLevels[2] ?? 0) / (userCount || 1)) * 100).toFixed(1) }}%)
                        </span>
                        <span class="flex flex-row items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold bg-red-50 text-red-700 border border-red-600">
                            <span class="size-2.5 rounded-full bg-red-600"></span>
                            Level 4: {{ userLevels[3] }} ({{ (((userLevels[3] ?? 0) / (userCount || 1)) * 100).toFixed(1) }}%)
                        </span>
                    </div>
                </div>
            </div>
        </SubCardContainer>
        
        <div class="grid grid-cols-2 gap-x-4">
            <DashboardCard :icon="ClipboardList" :header="{ key: 'Courses', value: courseCount }" :value="toItems(courseLevels)" />
        </div>
    </div>
</template>
