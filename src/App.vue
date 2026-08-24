<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue';
import UserSideBar from '@/components/sidebar/UserSideBar.vue';
import AdminSideBar from '@/components/sidebar/AdminSideBar.vue';
import NavBar from '@/components/NavBar.vue';

import Footer from './components/Footer.vue';
import { useUserStore } from './stores/user.ts';
const userStore = useUserStore()
</script>

<template>
  <!-- User Pages -->
  <div v-if="userStore.role === 'USER' && $route.name !== 'Login' && $route.name != 'Register' && $route.name !== 'Home'" 
  class="min-h-screen bg-gray-100 grid grid-cols-5 bg-linear-to-b from-brand-sky-blue to-brand-white">
      <UserSideBar class="col-span-1"/>
      <div class="col-span-4 w-full flex flex-col">
          <NavBar/>
          <RouterView class="h-full"/>
          <Footer/>
      </div>
  </div>
  <!-- Admin Pages -->
  <div v-else-if="userStore.role === 'ADMIN' && $route.name !== 'Login' && $route.name != 'Register' && $route.name !== 'Home'" 
  class="min-h-screen bg-gray-100 grid grid-cols-5">
      <AdminSideBar class="col-span-1"/>
      <div class="col-span-4 w-full flex flex-col">
          <NavBar/>
          <RouterView class="h-full"/>
          <Footer/>
      </div>
  </div>
  <!-- The Home Page -->
  <div v-else-if="$route.name != 'Login' && $route.name != 'Register'">
    <NavBar/>
    <RouterView/>
    <Footer/>
  </div>
  <!-- Login and Register Page -->
    <div v-else>
    <RouterView/>
  </div>
  <SpeedInsights/>
</template>
