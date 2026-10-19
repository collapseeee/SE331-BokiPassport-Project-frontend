<script lang="ts" setup>
import { ref } from 'vue'
import { CircleUserRound, UserRound, MapPin } from '@lucide/vue'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import SubmitButton from '@/components/Button.vue'
import FormInput from '@/components/form/FormInput.vue'
import PasswordInput from '@/components/form/FormPasswordInput.vue'
import ImageUpload from '@/components/form/ImageUpload.vue'
import FormError from '@/components/form/FormError.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Profile photo (v-model from ImageUpload)
const profilePhotos = ref<string[]>([])

// Yup validation schema — custom error messages per field
const validationSchema = yup.object({
  firstname: yup.string().required('First name is required'),
  lastname: yup.string().required('Last name is required'),
  username: yup.string().required('Username is required').min(3, 'At least 3 characters'),
  password: yup.string().required('Password is required').min(6, 'At least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  province: yup.string().required('Province is required'),
})

// VeeValidate form handling
const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmPassword: '',
    province: '',
  },
})

// Individual field bindings (value + vee-validate attrs)
const { value: firstname } = useField<string>('firstname')
const { value: lastname } = useField<string>('lastname')
const { value: username } = useField<string>('username')
const { value: password } = useField<string>('password')
const { value: confirmPassword } = useField<string>('confirmPassword')
const { value: province } = useField<string>('province')

// Form submit — only fires if validation passes
const onSubmit = handleSubmit((values) => {
  // TODO: Call authStore.register(values) when registration API is ready
  console.log('Form valid:', values)
  router.push({ name: 'Login' })
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
          <ImageUpload v-model="profilePhotos" />
        </div>

        <!-- Registration Form -->
        <form @submit.prevent="onSubmit" class="space-y-4">
          <!-- First Name / Last Name -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <FormInput v-model="firstname" id="firstName" label="First Name" placeholder="e.g. Boki" required />
              <FormError :errors="errors.firstname" />
            </div>
            <div>
              <FormInput v-model="lastname" id="lastName" label="Last Name" placeholder="e.g. Naraku" required />
              <FormError :errors="errors.lastname" />
            </div>
          </div>

          <!-- Username -->
          <div>
            <FormInput v-model="username" id="username" label="Username" placeholder="e.g. boki_narak" :icon="UserRound" required />
            <FormError :errors="errors.username" />
          </div>

          <!-- Password -->
          <div>
            <PasswordInput v-model="password" id="password" label="Password" required />
            <FormError :errors="errors.password" />
          </div>

          <!-- Confirm Password -->
          <div>
            <PasswordInput v-model="confirmPassword" id="confirmPassword" label="Confirm Password" required />
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

        <!-- Login link -->
        <p class="text-center text-brand-black">
          Already have an account?
          <router-link :to="{ name: 'Login' }" class="text-brand-blue underline hover:text-brand-light-blue">Login</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
