<script lang="ts" setup>
import AdminHeader from '@/components/AdminHeader.vue';
import Container from '@/components/Container.vue';
import TableContainer from '@/components/table/TableContainer.vue';
import UserService from '@/services/UserService';
import type { User } from '@/types';
import { onMounted, ref, watchEffect } from 'vue';

const tableHeaders = ['Name', 'Surname', 'Level', 'Province', 'Action']
const users = ref<User[] | null>(null)
onMounted(() => {
    watchEffect(() => {
        UserService.getUsers()
            .then(res => users.value = res.data.filter((user: User) => user.role !== 'admin'))
    })
})
</script>

<template>
    <AdminHeader title="Manage Users" description="Boki Passport user management system"/>
    <div class="p-5 flex flex-col items-center w-full">
        <Container title="" isPagination isFilter>
            <TableContainer v-if="users" :headers="tableHeaders" :rows="users" />
        </Container>
    </div>
</template>
