<script setup lang="ts">
import { useBadgesStore } from '@/stores/badges';
import { Brain } from '@lucide/vue';
import Button from '../Button.vue';
import SubCardContainer from '../cards/SubCardContainer.vue';
import ModalContainer from './ModalContainer.vue';
const badgesStore = useBadgesStore()
const isModalOpen = defineModel<boolean>()

const closeModal = () => isModalOpen.value = false
</script>

<template>
    <ModalContainer v-model="isModalOpen">
        <h2>New Badge Unlocked!</h2>
        <SubCardContainer class="my-3">
            <template #default>
                <Brain class="size-24 text-brand-red"/>
                <p class="pt-2.5">{{ badgesStore.badges[badgesStore.badges.length - 1]?.name }}</p>
            </template>
        </SubCardContainer>
        <Button @click.prevent="closeModal" bg-color="brand-green" label="Proceed"/>
    </ModalContainer>
</template>