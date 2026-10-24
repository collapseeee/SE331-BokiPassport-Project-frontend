<script setup lang="ts">
import type { ExamHistory, User } from '@/types';
import { Menu } from '@lucide/vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
    row: User | ExamHistory
}>()

const router = useRouter()
const isUser = (row: User | ExamHistory): row is User => {
    return (<User>row).firstName !== undefined;
}

const mappedRow = computed(() => {
    if (isUser(props.row)) {
        const { firstName, lastName, levels, province } = props.row as User
        return {
            name: firstName,
            surname: lastName,
            levelId: levels[levels.length - 1]?.name,
            province: province,
            menu: ''
        }
    }
    const { createdAt, name, description, totalScore, isPassed, level } = props.row as ExamHistory
    const examName = name || `Upgrade to Level ${level}`
    const date = new Date(createdAt)
    const parsedDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
    return {
        date: parsedDate,
        examName: name,
        score: totalScore,
        status: isPassed ? 'Passed' : 'Failed'
    }
})


const handleClick = () => {
    if (isUser(props.row)) {
        router.push({ name: 'AdminUserManagementDetail', params: { id: props.row.id }})
        return
    }
    console.log('exam history clicked')
}
</script>

<template>
    <tr v-if="mappedRow" @click="handleClick" class="flex flex-row w-full cursor-pointer transition-all hover:scale-101 hover:font-bold">
        <td class="px-4 py-2 w-full text-center" v-for="(value,  key, index) in mappedRow" :key="key">
            <!-- If is user list -->
            <p v-if="isUser(row)">{{ value }}</p>
            <!-- Else -->
            <div v-else>
                <!-- Passed / Failed in User Profile -->
                <p v-if="index === 3" :class="{ 'text-brand-red' : value === 'Failed', 'text-brand-green underline': value === 'Passed'}">
                    {{ value }}
                </p>
                <p v-else>{{ value }}</p>
            </div>
            <Menu class="w-full" v-if="index === 4 && isUser(row)"/>
        </td>
    </tr>
</template>