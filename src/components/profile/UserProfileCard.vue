<script setup lang="ts">
import CardContainer from '../cards/CardContainer.vue';
import BenefitItem from './BenefitItem.vue';
</script>

<template>
    <CardContainer class="md:w-2/3 lg:w-1/2">
        <div class="flex flex-row gap-x-10 w-full">
            <!-- Left side of card -->
            <div class="w-1/2 flex flex-col gap-y-2">
                <div class="flex flex-col items-center">
                    <img class="rounded-full border-2 border-sky-500 size-24" src="https://avatars.githubusercontent.com/u/316038766?s=200&v=4" alt="">
                <p class="text-xl/7 font-bold">Boki Chan</p>
                <p class="text-md text-mist-800">tofusan</p>
                <div class="grid grid-cols-2 text-lg gap-x-3">
                    <p class="text-start">Province:</p>
                    <p class="font-bold text-end truncate"> {{  'Chiang Mai ' }}</p>
                </div>
                </div>
                <div class="grid grid-cols-2 w-full border items-center rounded-xl px-5 py-2 bg-sky-950">
                    <p class="text-mist-50">Level:</p>
                    <p class="text-sky-400 font-bold text-2xl text-right">1</p>
                    <p class="text-mist-50">Badges:</p>
                    <p class="text-sky-400 font-bold text-2xl text-right">1 / ???</p>
                </div>
            </div>

            <!-- Right side of card -->
            <div class="w-1/2">
                <p class="text-xl font-bold">Services</p>
                <BenefitItem :isEligible="true" v-for="benefit in [{id: 1}]" :key="benefit.id"/>
            </div>
        </div>
    </CardContainer>
</template>