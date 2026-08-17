<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue';
import UserSideBar from '@/components/sidebar/UserSideBar.vue';
import AdminSideBar from '@/components/sidebar/AdminSideBar.vue';
import NavBar from '@/components/NavBar.vue';

import { role } from '@/stores/user.ts';
import Footer from './components/Footer.vue';

</script>

<template>
  <div v-if="role == 'USER' && $route.name != 'Login' && $route.name != 'Register' && $route.name != 'Home'" 
  class="h-screen bg-gray-100 overflow-hidden grid grid-cols-5">
      <UserSideBar class="col-span-1"/>
      <div class="col-span-4 w-full flex flex-col">
          <NavBar/>
          <RouterView/>
          <Footer/>
      </div>
  </div>
  <div v-else-if="role == 'ADMIN' && $route.name != 'Login' && $route.name != 'Register' && $route.name != 'Home'" 
  class="h-screen bg-gray-100 overflow-hidden grid grid-cols-5">
      <AdminSideBar class="col-span-1"/>
      <div class="col-span-4 w-full flex flex-col">
          <NavBar/>
          <RouterView/>
          <Footer/>
      </div>
  </div>
  <div v-else-if="$route.name != 'Login' && $route.name != 'Register'">
    <NavBar/>
    <RouterView/>
    <Footer/>
  </div>
    <div v-else>
    <RouterView/>
  </div>
  <SpeedInsights/>
</template>

<style scoped></style>
