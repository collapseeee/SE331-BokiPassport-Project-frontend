<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { Brain, CircleCheck, CircleX } from '@lucide/vue';
import ModalContainer from './ModalContainer.vue';
import SubCardContainer from '../cards/SubCardContainer.vue';
import Button from '../Button.vue';
import { useRouter } from 'vue-router';
import BadgeService from '@/services/BadgeService.ts';
import type { Badge } from '@/types.ts';
import { useBadgesStore } from '@/stores/badges.ts';

const badgesStore = useBadgesStore()
const router = useRouter();
const props = defineProps<{
    totalScore: number
    maxScore: number
    isPassed: boolean
    examLevel: number
}>();

const textColorClass = computed(() => props.isPassed ? 'text-brand-green' : 'text-brand-red');

const isOpen = defineModel<boolean>();
const badge = ref<Badge | null>(null)

onMounted(() => {
    if (props.isPassed) {
        BadgeService.getBadgeById(props.examLevel + 2)
            .then(res => badge.value = res.data)
    } else {
        BadgeService.getBadgeById(7)
            .then(res => badge.value = res.data)
    }
})

const handleProceed = (close: () => void) => {
    close();
    router.push({ name: 'ExamList' })
        .then(() => router.go(0))
}

</script>
<template>
    <ModalContainer v-model="isOpen" v-slot="{ close }">
        <h1>Examination Result</h1>
        <div class="flex flex-col items-center py-4">
            <div class="py-2" :class="textColorClass">
            <CircleCheck v-if="props.isPassed" class="size-24"/>
            <CircleX v-else class="size-24"/>
        </div>
        <h2 :class="textColorClass">{{ props.isPassed ? 'Passed!' : 'Failed!' }}</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 mb-4">
            <SubCardContainer>
                <template #default>
                    <p class="font-bold">Total Score:</p>
                    <h1 class="text-6xl!"><span :class="textColorClass">{{ props.totalScore }}</span><span class="text-base text-brand-black font-medium px-2">out of</span>{{ props.maxScore }}</h1>
                    <p class="pt-2.5">Your total score</p>
                </template>
            </SubCardContainer>
            <SubCardContainer>
                <template #default>
                    <p class="font-bold">Percentage:</p>
                    <h1 class="text-6xl!"><span :class="textColorClass">{{ Math.round((props.totalScore/props.maxScore) * 100) }}</span><span class="text-base text-brand-black font-medium px-2">%</span></h1>
                    <p class="pt-2.5">Out of 100%</p>
                </template>
            </SubCardContainer>
        </div>
        <SubCardContainer v-if="isPassed" class="mb-3">
            <template #default>
                <p class="font-bold">New Badge Unlocked!</p>
                <Brain class="size-24 text-brand-green"/>
                <p class="pt-2.5">{{ badge?.name }}</p>
            </template>
        </SubCardContainer>
        <SubCardContainer v-else v-if="!badgesStore.isEarned(7)" class="mb-3">
            <template #default>
                <p class="font-bold">New Badge Unlocked!</p>
                <Brain class="size-24 text-brand-red"/>
                <p class="pt-2.5">{{ badge?.name }}</p>
            </template>
        </SubCardContainer>
        <div v-if="props.isPassed" class="flex justify-end">
            <Button label="Proceed" class="w-fit" bg-color="brand-green" @click="handleProceed(close)"/>
        </div>
        <div v-else class="w-full flex justify-between">
            <Button label="Exit" class="w-fit" bg-color="brand-red" :to=" { name: 'ExamList' } " @click="close"/>
            <Button label="Retry" class="w-fit" bg-color="brand-black" :to=" { name: 'ExamView', params: { id: 1 } }" @click="close"/>
        </div>
    </ModalContainer>
</template>