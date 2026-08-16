<script lang="ts" setup>
import { ref } from 'vue'
import { CircleUserRound, UserRound, Lock, EyeOff, Eye, MapPin } from '@lucide/vue';
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'


const showPassword = ref(false)
const showConfirmPassword = ref(false)
const firstname = ref('')
const lastname = ref('')
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const province = ref('')
const errorMessage = ref('')

// Will implement handleRegister later
// That includes confirming password check


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
                    <p class="text-brand-black">Create your account to meet your AI.</p>
                </div>

                <!-- will implement later -->
                <form @submit.prevent="handleRegister" class="space-y-4">
                    <!-- first name and last name -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="firstName" class="block text-sm font-medium text-gray-800 mb-1">First Name</label>
                            <input v-model="firstname" id="firstName" name="firstName" placeholder="Boki" required
                                class="w-full px-3 py-2.5 border border-brand-gray rounded-md bg-white focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400" />
                        </div>
                        <div>
                            <label for="lastName" class="block text-sm font-medium text-gray-800 mb-1">Last Name</label>
                            <input v-model="lastname" id="lastName" name="lastName" placeholder="Naraku" required
                                class="w-full px-3 py-2.5 border border-brand-gray rounded-md bg-white focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400" />
                        </div>
                    </div>

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

                        </div>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-3 flex items-center text-brand-gray">
                                <Lock />
                            </span>

                            <input v-model="password" :type="showPassword ? 'text' : 'password'" id="password" name="password" placeholder="••••••••" required
                                class="w-full pl-10 pr-10 py-2.5 border border-brand-gray rounded-md bg-white focus:outline-none focus:ring focus:ring-brand-blue focus:border-brand-blue" />

                            <button type="button" @click="showPassword = !showPassword"
                                class="absolute inset-y-0 right-3 flex items-center text-brand-gray hover:text-brand-light-blue">
                                <Eye v-if="showPassword" class="w-5 h-5" />
                                <EyeOff v-else class="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <!-- confirm password -->
                    <div>
                        <div class="flex items-center justify-between mb-1">
                            <label for="confirmPassword" class="block text-sm font-medium text-gray-800">Confirm Password</label>

                        </div>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-3 flex items-center text-brand-gray">
                                <Lock />
                            </span>

                            <input v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword" name="confirmPassword" placeholder="••••••••" required
                                class="w-full pl-10 pr-10 py-2.5 border border-brand-gray rounded-md bg-white focus:outline-none focus:ring focus:ring-brand-blue focus:border-brand-blue" />

                            <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                                class="absolute inset-y-0 right-3 flex items-center text-brand-gray hover:text-brand-light-blue">
                                <Eye v-if="showConfirmPassword" class="w-5 h-5" />
                                <EyeOff v-else class="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <!-- Province -->
                    <div>
                        <label for="province" class="block text-sm font-medium text-gray-800 mb-1">Province</label>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-3 flex items-center text-brand-gray">
                                <MapPin class="w-5 h-5" />
                            </span>

                            <input v-model="province" id="province" name="province" placeholder="chiang Rai" required
                                class="w-full pl-10 pr-3 py-2.5 border border-brand-gray rounded-md bg-white focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400" />

                        </div>
                    </div>
                    
                    <!-- Error banner -->
                    <div v-if="errorMessage"
                    class="px-4 py-2 text-sm text-brand-red bg-red-100 border border-red-300 rounded-md">
                    {{ errorMessage }}
                    </div>

                    <!-- Sign up button -->
                    <button type="submit"
                        class="w-full px-4 py-3 mt-2 text-brand-white font-medium bg-brand-blue rounded-md hover:bg-brand-light-blue focus:outline-none focus:ring focus:ring-brand-blue transition-colors">
                        Sign Up
                    </button>
                    
                
                </form>
                <!-- Register link -->
                <p class="text-center text-brand-black">
                    Already have an account?
                    <router-link :to="{ name: 'Login' }" class="text-brand-blue underline hover:text-brand-light-blue">Login</router-link>
                </p>
            </div>
        </div>
    </div>
</template>