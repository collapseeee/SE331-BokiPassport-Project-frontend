<script lang="ts" setup>
import { ref } from 'vue'
import { CircleUserRound, UserRound} from '@lucide/vue';
import { useAuthStore } from '@/stores/auth'
import SubmitButton from '@/components/Button.vue';
import FormInput from '@/components/form/FormInput.vue'
import PasswordInput from '@/components/form/FormPasswordInput.vue'
import { useRouter } from 'vue-router';
import type { AuthenticateRequest } from '@/services/SecurityService';

const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const errorMessage = ref('')

function handleLogin(){
    errorMessage.value = ''

    if (!username.value || !password.value) {
        errorMessage.value = 'Please enter both username and password.'
        return
    }

    authStore.authenticate({
        username: username.value,
        password: password.value
    } as AuthenticateRequest)
        .then((res) => {
            if (res.success && res.user) {
                router.go(0)
                router.push( authStore.isAdmin ? { name: 'AdminView' } : { name: 'UserProfile' } )
            }
            return errorMessage.value = res.error ?? 'Login failed. Please try again.'
        })
        .catch((err) => {
            console.error('An error occurs while login: ', err)
        })
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
                    <h1 class="text-brand-black">Boki Passport</h1>
                    <p class="text-brand-black">Sign in to access your AI.</p>
                </div>

                <form @submit.prevent="handleLogin" class="space-y-4">
                    <!-- Username -->
                    <FormInput v-model="username" id="username" label="Username" placeholder="Enter your username" :icon="UserRound" required />

                    <!-- Password -->
                    <div>
                        <div class="flex items-center justify-between mb-1">
                            <label for="password" class="block text-sm font-medium text-gray-800">Password</label>

                            <!-- will implement later -->
                            <router-link to="" class="text-sm text-brand-blue underline hover:text-brand-light-blue">
                                Forgot password?
                            </router-link>
                            
                        </div>
                        <PasswordInput v-model="password" id="password" label="" required />
                    </div>

                    <!-- Error banner -->
                    <div v-if="errorMessage"
                    class="px-4 py-2 text-sm text-brand-red bg-red-100 border border-red-300 rounded-md">
                    {{ errorMessage }}
                    </div>
                    
                    <!-- Sign In button -->
                    <SubmitButton type="submit"
                        class="w-full px-4 py-3 mt-2"
                        label="Sign In"/>
                    
                
                </form>
                <!-- Register link -->
                <p class="text-center text-brand-black">
                    Don't have account?
                    <router-link :to="{ name: 'Register' }" class="text-brand-blue underline hover:text-brand-light-blue">Register</router-link>
                </p>
            </div>
        </div>
    </div>
</template>
