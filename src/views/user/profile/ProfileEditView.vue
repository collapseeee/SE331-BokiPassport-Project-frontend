<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { CircleUserRound, UserRound, X } from '@lucide/vue';
import FormInput from '@/components/form/FormInput.vue';
import FormError from '@/components/form/FormError.vue';
import Button from '@/components/Button.vue';
import ImageUpload from '@/components/form/ImageUpload.vue';
import ModalContainer from '@/components/modal/ModalContainer.vue';
import PostOperationModal from '@/components/modal/PostOperationModal.vue';
import UserService from '@/services/UserService';
import { getPresignedImageUrl } from '@/services/ImageService';
import { useAuthStore } from '@/stores/auth';
import { personName } from '@/validation/schemas';
import type { UserPayload } from '@/types';

const route = useRoute();
const authStore = useAuthStore();

const profilePhotos = ref<string[]>([]);
const displayImage = ref<string>('');
const isChangeImageOpen = ref(false);

const isModalOpen = ref(false);
const isSuccess = ref(true);
const operationMsg = ref('Profile Update');
const successMsg = ref('');

const validationSchema = yup.object({
    firstName: personName('First name'),
    lastName: personName('Last name'),
    province: personName('Province'),
});

const { errors, handleSubmit, resetForm, setValues } = useForm({
    validationSchema,
    initialValues: {
        firstName: '',
        lastName: '',
        province: '',
    },
});

const { value: firstName } = useField<string>('firstName');
const { value: lastName } = useField<string>('lastName');
const { value: province } = useField<string>('province');

const initialValues = ref({
    firstName: '',
    lastName: '',
    province: '',
    rawImage: '',
    presignedImage: '',
});

onMounted(async () => {
    if (authStore.isAdmin && route.params.id) {
        try {
            const userRes = await UserService.getUser(Number(route.params.id));
            const u = userRes.data;
            const presigned = await getPresignedImageUrl(u.image);
            displayImage.value = presigned;
            initialValues.value = {
                firstName: u.firstName ?? '',
                lastName: u.lastName ?? '',
                province: u.province ?? '',
                rawImage: u.image ?? '',
                presignedImage: presigned,
            };
            setValues({
                firstName: initialValues.value.firstName,
                lastName: initialValues.value.lastName,
                province: initialValues.value.province,
            });
        } catch (error) {
            console.error('Failed to load user data:', error);
        }
    } else if (authStore.user) {
        const presigned = await getPresignedImageUrl(authStore.user.image);
        displayImage.value = presigned;
        initialValues.value = {
            firstName: authStore.user.firstName ?? '',
            lastName: authStore.user.lastName ?? '',
            province: authStore.user.province ?? '',
            rawImage: authStore.user.image ?? '',
            presignedImage: presigned,
        };
        setValues({
            firstName: initialValues.value.firstName,
            lastName: initialValues.value.lastName,
            province: initialValues.value.province,
        });
    }
});

watch(profilePhotos, async (newVal) => {
    if (newVal.length > 0) {
        const presigned = await getPresignedImageUrl(newVal[0]!);
        displayImage.value = presigned;
        isChangeImageOpen.value = false;
    }
});

const handleReset = () => {
    resetForm({
        values: {
            firstName: initialValues.value.firstName,
            lastName: initialValues.value.lastName,
            province: initialValues.value.province,
        },
    });
    profilePhotos.value = [];
    displayImage.value = initialValues.value.presignedImage;
};

const onSubmit = handleSubmit(async (values) => {
    try {
        const imageToSave = profilePhotos.value[0] || initialValues.value.rawImage || '';
        const payload: UserPayload = {
            firstName: values.firstName,
            lastName: values.lastName,
            province: values.province,
            ...(imageToSave ? { image: imageToSave } : {}),
        };

        if (authStore.isAdmin && route.params.id) {
            await UserService.saveUserByAdmin(Number(route.params.id), payload);
        } else {
            await UserService.saveUserByUser(payload);
            if (authStore.user) {
                authStore.user = {
                    ...authStore.user,
                    ...payload,
                };
            }
            if (imageToSave) {
                authStore.updateProfileImage(imageToSave);
            }
        }

        initialValues.value = {
            ...initialValues.value,
            ...values,
            rawImage: imageToSave,
            presignedImage: displayImage.value,
        };
        isSuccess.value = true;
        operationMsg.value = 'Profile Update';
        successMsg.value = 'Profile details updated successfully.';
        isModalOpen.value = true;
    } catch (error) {
        console.error('Failed to update profile:', error);
        isSuccess.value = false;
        operationMsg.value = 'Profile Update';
        isModalOpen.value = true;
    }
});
</script>

<template>
    <div class="w-full flex justify-center py-2">
        <PostOperationModal
            v-model="isModalOpen"
            :operationMsg="operationMsg"
            :success="isSuccess"
            :successMsg="successMsg"
        />

        <!-- Image Upload Modal -->
        <ModalContainer v-model="isChangeImageOpen">
            <ImageUpload v-model="profilePhotos" :max-size="2" @cancel="isChangeImageOpen = false" />
        </ModalContainer>

        <div class="w-full max-w-md p-8 space-y-6 bg-gray-200 rounded-lg shadow-xl">
            <X class="cursor-pointer ml-auto hover:text-brand-red" @click="$router.back()"/>
            <!-- Title -->
            <div class="flex flex-col items-center space-y-2">
                <h1 class="text-brand-black text-2xl font-bold">Edit Profile</h1>
                <p class="text-brand-black text-sm text-center">Update your personal details and photo.</p>
            </div>

            <!-- Profile Photo with Change Image Button (Matching Profile Card) -->
            <div class="flex flex-col items-center space-y-2">
                <div class="flex flex-col items-center relative">
                    <img
                        v-if="displayImage"
                        class="rounded-full border-2 border-sky-500 size-32 object-cover"
                        :src="displayImage"
                        alt="Profile photo"
                    />
                    <div
                        v-else
                        class="flex justify-center items-center size-32 rounded-full border border-brand-blue bg-gray-300"
                    >
                        <UserRound class="w-24 h-24 text-brand-dark-blue" />
                    </div>
                    <Button
                        type="button"
                        label="Change Image"
                        @click="isChangeImageOpen = true"
                    />
                </div>
            </div>

            <!-- Edit Form -->
            <form @submit.prevent="onSubmit" class="space-y-4">
                <!-- First Name / Last Name -->
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <FormInput
                            v-model="firstName"
                            id="edit-firstName"
                            label="First Name"
                            placeholder="e.g. Boki"
                            required
                        />
                        <FormError :errors="errors.firstName" />
                    </div>
                    <div>
                        <FormInput
                            v-model="lastName"
                            id="edit-lastName"
                            label="Last Name"
                            placeholder="e.g. Naraku"
                            required
                        />
                        <FormError :errors="errors.lastName" />
                    </div>
                </div>

                <!-- Province -->
                <div>
                    <FormInput
                        id="edit-province"
                        label="Province"
                        placeholder="e.g. Chiang Mai"
                        v-model="province"
                        class="max-w-full"
                    />
                    <FormError :errors="errors.province" />
                </div>

                <!-- Action Buttons -->
                <div class="flex justify-between pt-2">
                    <Button
                        type="button"
                        bg-color="brand-white"
                        text-color="brand-black"
                        class="w-1/2 px-4 py-3"
                        label="Reset"
                        @click="handleReset"
                    />
                    <Button
                        type="submit"
                        class="w-1/2 px-4 py-3"
                        label="Save Changes"
                    />
                </div>
            </form>
        </div>
    </div>
</template>
