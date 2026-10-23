<script lang="ts" setup>
import AdminHeader from '@/components/AdminHeader.vue';
import Container from '@/components/Container.vue';
import TableContainer from '@/components/table/TableContainer.vue';
import Pagination from '@/components/Pagination.vue';
import type { User } from '@/types';
import { computed, onMounted, ref, watchEffect } from 'vue';
import UserService from '@/services/UserService';
import NotFoundText from '@/components/NotFoundText.vue';
const props = defineProps<{
    page: number
}>()

const tableHeaders = ['Name', 'Surname', 'Level', 'Province', 'Action']

const paginatedUsers = ref<User[] | null>(null)
const totalUsers = ref<number>(0)
const currentItems = ref<number>(0)

onMounted(() => {
    watchEffect(() => {
        UserService.getUsers(100, 1, { name: '', province: '', level: '' })
            .then(res => {
                const allUsers = (res.data as User[]).filter(u => !u.roles.includes('ROLE_ADMIN'))
                totalUsers.value = allUsers.length
                const start = (props.page -1) * 5
                paginatedUsers.value = allUsers.slice(start, start + 5)
                currentItems.value = paginatedUsers.value?.length ?? 0;
            })
            .catch(() => {
                paginatedUsers.value = null
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
                <div v-if="paginatedUsers">
                    <TableContainer :headers="tableHeaders" :rows="paginatedUsers" />
                    <Pagination :page="Number(page)" :currentItems :totalItems="Number(totalUsers)" :hasNextPage/>
                </div>
                <NotFoundText v-else text="No user yet!"/>
            </Container>
        </div>
    </div>
    <RouterView v-else/>
</template>
