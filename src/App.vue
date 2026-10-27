<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue';
import UserSideBar from '@/components/sidebar/UserSideBar.vue';
import AdminSideBar from '@/components/sidebar/AdminSideBar.vue';
import NavBar from '@/components/NavBar.vue';
import Footer from './components/Footer.vue';
import { useAuthStore } from './stores/auth.ts';
const authStore = useAuthStore()
</script>

<template>
  <!-- User Pages -->
  <div v-if="authStore.isUser && $route.name !== 'Login' && $route.name != 'Register' && $route.name !== 'Home'" 
  class="min-h-screen bg-gray-100 grid grid-cols-5 bg-linear-to-b from-brand-sky-blue to-brand-white">
      <UserSideBar class="col-span-1"/>
      <div class="col-span-4 w-full flex flex-col">
          <NavBar/>
          <RouterView/>
          <Footer/>
      </div>
  </div>
  <!-- Admin Pages -->
  <div v-else-if="authStore.isAdmin && $route.name !== 'Login' && $route.name != 'Register' && $route.name !== 'Home'" 
  class="min-h-screen bg-gray-100 grid grid-cols-5">
      <AdminSideBar class="col-span-1"/>
      <div class="col-span-4 w-full flex flex-col">
          <NavBar/>
          <RouterView/>
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
