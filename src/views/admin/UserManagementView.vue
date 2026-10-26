<script lang="ts" setup>
import AdminHeader from '@/components/AdminHeader.vue';
import Container from '@/components/Container.vue';
import TableContainer from '@/components/table/TableContainer.vue';
import Pagination from '@/components/Pagination.vue';
import type { User } from '@/types';
import { computed, onMounted, ref, watchEffect } from 'vue';
import UserService from '@/services/UserService';
import NotFoundText from '@/components/NotFoundText.vue';
import { useRoute } from 'vue-router';
const props = defineProps<{
    page: number
}>()
const route = useRoute()
const tableHeaders = ['Name', 'Surname', 'Level', 'Province', 'Action']

const users = ref<User[] | null>(null)
const totalUsers = ref<number>(0)
const currentItems = ref<number>(0)

const levelFilterResult = computed(() => {
    if (!route.query.level || route.query.level === 'all') return ''

    return route.query.level
})

onMounted(() => {
    watchEffect(() => {
        UserService.getUsers(5, props.page, { 
            name: route.query.search as string ?? '',
            province: route.query.province as string ?? '',
            level: levelFilterResult.value as string
        })
            .then(res => {
                totalUsers.value = res.headers['x-total-count'] as number
                users.value = res.data
                currentItems.value = res.data.length as number;
            })
            .catch(() => {
                users.value = null
            })
    })
})
const hasNextPage = computed(() => {
    return props.page < Math.ceil(totalUsers.value / 5)
})
</script>

<template>
    <div v-if="$route.name === 'AdminUserManagement'">
        <AdminHeader title="Manage Users" description="Boki Passport user management system"/>
        <div class="p-5 flex flex-col items-center w-full">
            <Container title="" isFilter>
                <div v-if="users">
                    <TableContainer :headers="tableHeaders" :rows="users" />
                    <Pagination :page="Number(page)" :currentItems :totalItems="Number(totalUsers)" :hasNextPage/>
                </div>
                <NotFoundText v-else text="No user yet!"/>
            </Container>
        </div>
    </div>
    <RouterView v-else/>
</template>
