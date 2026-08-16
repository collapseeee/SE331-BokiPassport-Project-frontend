<script lang="ts" setup>
import { ref } from 'vue'
import { CircleUserRound, UserRound, Lock, EyeOff, Eye} from '@lucide/vue';
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'


const showPassword = ref(false)

const username = ref('')
const password = ref('')
const errorMessage = ref('')


</script>

<template>
    <div class="w-full min-h-screen bg-linear-to-b from-brand-blue to-brand-white">
        <div class="flex flex-col items-center justify-center min-h-screen py-8 px-4">
            <div class="w-full max-w-md p-8 space-y-6 bg-gray-200 rounded-lg shadow-xl">

                <!-- Title -->
                <div class="flex flex-col items-center space-y-2">
                    <div class="flex items-center justify-center w-14 h-14 text-brand-black">
                        <CircleUserRound class="w-20 h-20" />
                    </div>
                    <h1 class="text-3xl font-bold text-brand-black">Boki Passport</h1>
                    <p class="text-brand-black">Sign in to access your AI.</p>
                </div>

                <!-- will implement later -->
                <form @submit.prevent="handleRegister" class="space-y-4">
                    <!-- Username -->
                    <div>
                        <label for="username" class="block text-sm font-medium text-gray-800 mb-1">Username</label>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-3 flex items-center text-brand-gray">
                                <UserRound class="w-5 h-5" />
                            </span>

                            <input v-model="username" id="username" name="username" placeholder="alex.turing" required
                                class="w-full pl-10 pr-3 py-2.5 border border-brand-gray rounded-md bg-white focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400" />

                        </div>
                    </div>

                    <!-- Password -->
                    <div>
                        <div class="flex items-center justify-between mb-1">
                            <label for="password" class="block text-sm font-medium text-gray-800">Password</label>

                            <!-- will implement later -->
                            <router-link to="" class="text-sm text-brand-blue underline hover:text-brand-light-blue">Forgot
                                password?</router-link>

                        </div>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-3 flex items-center text-brand-gray">
                                <Lock />
                            </span>

                            <input v-model="password" :type="showPassword ? 'text' : 'password'" id="password" name="password" required
                                class="w-full pl-10 pr-10 py-2.5 border border-brand-gray rounded-md bg-white focus:outline-none focus:ring focus:ring-brand-blue focus:border-brand-blue" />

                            <button type="button" @click="showPassword = !showPassword"
                                class="absolute inset-y-0 right-3 flex items-center text-brand-gray hover:text-brand-light-blue">
                                <Eye v-if="showPassword" class="w-5 h-5" />
                                <EyeOff v-else class="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <!-- Sign In button -->
                    <button type="submit"
                        class="w-full px-4 py-3 mt-2 text-brand-white font-medium bg-brand-blue rounded-md hover:bg-brand-light-blue focus:outline-none focus:ring focus:ring-brand-blue transition-colors">
                        Sign In
                    </button>
                    <!-- Error banner -->
                    <div v-if="errorMessage"
                    class="px-4 py-2 text-sm text-brand-red bg-red-100 border border-red-300 rounded-md">
                    {{ errorMessage }}
                    </div>
                
                </form>
                <!-- Register link -->
                <p class="text-center text-brand-black">
                    Don't have account?
                    <router-link to="/register" class="text-brand-blue underline hover:text-brand-light-blue">Register</router-link>
                </p>
            </div>
        </div>
    </div>
</template>