<script setup lang="ts">
import { X, Check } from '@lucide/vue';
import Button from '../Button.vue';
import ModalContainer from './ModalContainer.vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const props = defineProps<{
    operationMsg: string,
    success: boolean,
    successMsg?: string
}>();

const isModalOpen = defineModel<boolean>()
const closeModal = () => {
    isModalOpen.value = false
    if (route.path.includes('question-management')) router.push( { name: 'AdminExamManagement' })
    else router.go(0);
}
</script>

<template>
    <ModalContainer v-model="isModalOpen">
        <div class="flex flex-col items-center gap-y-4">
            <h2 class="text-center" :class="props.success? 'text-green-700' : 'text-red-700'">{{  props.success? `${props.operationMsg} Successful!` : `${props.operationMsg} Failed!` }}</h2>
            <div class="flex flex-col items-center gap-4 text-center py-8">
                <Check v-if="props.success" class="p-4 w-20 h-20 rounded-full border-3 border-green-700 text-green-700 animate-bounce" />
                <X v-else class="p-4 w-20 h-20 rounded-full border-3 border-red-700 text-red-700 animate-bounce" />
            </div>
            <p class="text-center">{{ props.success ? (props.successMsg ?? 'Your operation was completed successfully.' ) : 'Please try again later.' }}</p>
            <Button class="w-fit! px-8!" @click.prevent="closeModal" bg-color="brand-green" label="OK"/>
        </div>
    </ModalContainer>
</template>