<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue';
import UserSideBar from '@/components/SideBar/UserSideBar.vue';
import AdminSideBar from '@/components/SideBar/AdminSideBar.vue';
import NavBar from '@/components/NavBar.vue';

import { role } from '@/stores/user.ts';

</script>

<template>
  <div v-if="role == 'USER'" class="h-screen bg-gray-100 overflow-hidden grid grid-cols-5">
      <UserSideBar class="col-span-1"/>
      <div class="col-span-4 w-full flex flex-col">
          <NavBar/>
          <div class="p-4">
              <RouterView/>
          </div>
      </div>
  </div>
  <div v-else-if="role == 'ADMIN'" class="h-screen bg-gray-100 overflow-hidden grid grid-cols-5">
      <AdminSideBar class="col-span-1"/>
      <div class="col-span-4 w-full flex flex-col">
          <NavBar/>
          <div class="p-4">
              <RouterView/>
          </div>
      </div>
  </div>
  <div v-else>
    <RouterView/>
  </div>
  <SpeedInsights/>
</template>

<style scoped></style>
