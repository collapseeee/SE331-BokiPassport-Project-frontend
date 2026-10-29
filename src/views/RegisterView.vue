<script lang="ts" setup>
import { ref } from 'vue'
import { CircleUserRound, UserRound, MapPin } from '@lucide/vue'
import * as yup from 'yup'
import { useValidation } from '@/validation/useValidation'
import { requiredString, password as passwordSchema, confirmPassword as confirmPasswordSchema } from '@/validation/schemas'
import SubmitButton from '@/components/Button.vue'
import FormInput from '@/components/form/FormInput.vue'
import PasswordInput from '@/components/form/FormPasswordInput.vue'
import ImageUpload from '@/components/form/ImageUpload.vue'
import FormError from '@/components/form/FormError.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Profile photo (v-model from ImageUpload)
const profilePhotos = ref<string[]>([])

// Yup validation schema — custom error messages per field
const validationSchema = yup.object({
  firstName: requiredString('First name is required.'),
  lastName: requiredString('Last name is required.'),
  username: requiredString('Username is required.').min(3, 'At least 3 characters long.'),
  password: passwordSchema(),
  confirmPassword: confirmPasswordSchema('password'),
  province: requiredString('Province is required.'),
})

// VeeValidate form handling
const { errors, handleSubmit, field } = useValidation(validationSchema, {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  confirmPassword: '',
  province: '',
})

const errorMessage = ref<string>('')

// Individual field bindings (value + vee-validate attrs)
const { value: firstName } = field ('firstName')
const { value: lastName } = field('lastName')
const { value: username } = field('username')
const { value: passwordValue } = field('password')
const { value: confirmPasswordValue } = field('confirmPassword')
const { value: province } = field('province')

// Form submit — only fires if validation passes
const onSubmit = handleSubmit((values) => {
    authStore.register({
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        password: values.password,
        province: values.province,
        image: profilePhotos.value[0] ?? '',
    })
      .then(() => {
        router.push({ name: 'UserProfile' })
      })
      .catch((err) => {
        errorMessage.value = err instanceof Error ? err.message : 'An error occurred.'
      })
})
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
          <p class="text-brand-black">Create your account to meet your AI.</p>
        </div>

        <!-- Profile Photo -->
        <div class="flex flex-col items-center space-y-2">
          <ImageUpload v-model="profilePhotos" :show-confirm="false" />
        </div>

        <!-- Registration Form -->
        <form @submit.prevent="onSubmit" class="space-y-4">
          <!-- First Name / Last Name -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <FormInput v-model="firstName" id="firstName" label="First Name" placeholder="e.g. Boki" required />
              <FormError :errors="errors.firstName" />
            </div>
            <div>
              <FormInput v-model="lastName" id="lastName" label="Last Name" placeholder="e.g. Naraku" required />
              <FormError :errors="errors.lastName" />
            </div>
          </div>

          <!-- Username -->
          <div>
            <FormInput v-model="username" id="username" label="Username" placeholder="e.g. boki_narak" :icon="UserRound" required />
            <FormError :errors="errors.username" />
          </div>

          <!-- Password -->
          <div>
            <PasswordInput v-model="passwordValue" id="password" label="Password" required />
            <FormError :errors="errors.password" />
          </div>

          <!-- Confirm Password -->
          <div>
            <PasswordInput v-model="confirmPasswordValue" id="confirmPassword" label="Confirm Password" required />
            <FormError :errors="errors.confirmPassword" />
          </div>

          <!-- Province -->
          <div>
            <FormInput v-model="province" id="province" label="Province" placeholder="e.g. Chiang Mai" :icon="MapPin" required />
            <FormError :errors="errors.province" />
          </div>

          <!-- Sign Up -->
          <SubmitButton type="submit" class="w-full px-4 py-3 mt-2" label="Sign Up" />
        </form>

        <FormError class="w-full text-center" :errors="errorMessage"/>

        <!-- Login link -->
        <p class="text-center text-brand-black">
          Already have an account?
          <router-link :to="{ name: 'Login' }" class="text-brand-blue underline hover:text-brand-light-blue">Login</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
