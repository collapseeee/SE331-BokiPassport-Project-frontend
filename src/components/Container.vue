<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CardPagination from './Pagination.vue';
import UserFilterTab from './UserFilterTab.vue';
import UserService from '@/services/UserService.ts';
import type { User } from '@/types.ts';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    isPagination: {
        type: Boolean,
        required: false
    },
    isFilter: {
        type: Boolean,
        required: false
    }
})
const provinces = ref<string[] | null>([])
onMounted(() => {
    if (props.isFilter) {
        UserService.getUsers()
            .then(res => {
                /* Get only the province field */
                const mappedProvince: string[] = res.data.map((user: User) => user.province)
                /* Get only string attribute and eliminate the null */
                const filteredProvince: string[] = [...new Set(mappedProvince)].filter((province: string) => province)
                provinces.value = filteredProvince
            })
    }
})

</script>

<template>
    <div class="flex flex-col w-4/5 items-center bg-brand-dark-blue py-5 rounded-xl">
        <UserFilterTab v-if="isFilter && provinces" :provinces="provinces"/>
        <h3 v-else class="text-brand-white w-full text-left pl-5 pb-4">{{ title }}</h3>
        <div class="w-full h-full bg-brand-white">
            <slot/>
        </div>
        <CardPagination v-if="isPagination"/>
    </div>
</template>