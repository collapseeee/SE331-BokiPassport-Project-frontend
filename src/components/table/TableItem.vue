<script setup lang="ts">
import type { ExamHistory, User } from '@/types';
import { Menu } from '@lucide/vue';
import { computed } from 'vue';
const props = defineProps<{
    row: User | ExamHistory
}>()

const isUser = (row: User | ExamHistory): row is User => {
    return (<User>row).firstName !== undefined;
}

const mappedRow = computed(() => {
    if (isUser(props.row)) {
        const { firstName, lastName, levelId, province } = props.row as User
        return {
            name: firstName,
            surname: lastName,
            levelId: levelId,
            province: province,
            menu: ''
        }
    }
    const { createdAt, examId, totalScore, isPassed } = props.row as ExamHistory
    return {
        date: createdAt,
        examName: examId,
        score: totalScore,
        status: isPassed ? 'Passed' : 'Failed'
    }
})
/* Filter out the object with 'id' to not let it consume a column */
/* const visibleRow = computed(() => {
    return Object.fromEntries(
        Object.entries(props.row)
                .filter(([key,value]) => {
                    if (key !== 'id') return value
                })
    )
}) */

</script>

<template>
    <tr v-if="mappedRow" class="flex flex-row w-full">
        <td class="px-4 py-2 w-full text-center" v-for="(value,  key, index) in mappedRow" :key="key">
            {{ value }}
            <Menu class="w-full" v-if="index === 4 && isUser(row)"/>
        </td>
    </tr>
</template>