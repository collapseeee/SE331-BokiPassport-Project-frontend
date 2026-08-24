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
const currentItems =ref<number>(0)
onMounted(() => {
    watchEffect(() => {
        UserService.getPaginatedUser(props.page)
            .then(res => {
                paginatedUsers.value = res.users
                currentItems.value = res.users.length
            })
        UserService.getUserUsers()
            .then(res => {
                totalUsers.value = res.length
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
                    <Pagination :page="Number(page)" :currentItems :totalItems="totalUsers" :hasNextPage/>
                </div>
                <NotFoundText v-else text="No user yet!"/>
            </Container>
        </div>
    </div>
    <RouterView v-else/>
</template>
