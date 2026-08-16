<script lang="ts" setup>
import { ref } from 'vue'
import { CircleUserRound, UserRound, MapPin } from '@lucide/vue';
import SubmitButton from '@/components/Button.vue'
import FormInput from '@/components/FormInput.vue'
import PasswordInput from '@/components/PasswordInput.vue'
// (auth store + router will be used when registration API is implemented)


const firstname = ref('')
const lastname = ref('')
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const province = ref('')
const errorMessage = ref('')

// Will implement handleRegister later (API + password confirmation)
const handleRegister = async () => {
  errorMessage.value = 'Registration is not available yet.'
}
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
                        <FormInput v-model="firstname" id="firstName" label="First Name" placeholder="Boki" required />
                        <FormInput v-model="lastname" id="lastName" label="Last Name" placeholder="Naraku" required />
                    </div>

                    <!-- Username -->
                    <FormInput v-model="username" id="username" label="Username" placeholder="alex.turing" :icon="UserRound" required />

                    <!-- Password -->
                    <PasswordInput v-model="password" id="password" label="Password" required />
          

                    <!-- confirm password -->
                    <PasswordInput v-model="confirmPassword" id="confirmPassword" label="Confirm Password" required />

                    <!-- Province -->
                    <FormInput v-model="province" id="province" label="Province" placeholder="Chiang Rai" :icon="MapPin" required />
                    
                    <!-- Error banner -->
                    <div v-if="errorMessage"
                    class="px-4 py-2 text-sm text-brand-red bg-red-100 border border-red-300 rounded-md">
                    {{ errorMessage }}
                    </div>

                    <!-- Sign up button -->
                    <SubmitButton type="submit"
                        class="w-full px-4 py-3 mt-2"
                        label="Sign Up"/>
                    
                
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