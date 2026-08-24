<script lang="ts" setup>
import Button from '@/components/Button.vue';
import IconCard from '@/components/cards/IconCard.vue';
import { BookOpenCheck, Brain, Star } from '@lucide/vue';
</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen gap-12 bg-linear-to-b from-brand-white to-brand-sky-blue">
        <div class="flex flex-col items-center gap-4">
            <h1 class="text-6xl! text-brand-black">Welcome to <span class="text-brand-blue">Boki Passport</span>!</h1>
            <p class="text-3xl text-brand-dark-blue">Learn, Level up your skill, and Unlock exclusive services for free!</p>
        </div>
        <Button label="Get Started!" to-name="Register" right-arrow class="text-2xl font-medium"></Button>
        <div class="grid md-grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 px-8">
            <IconCard 
                :icon="Brain" 
                icon-color="brand-red" 
                size="xl" 
                title="Learn" 
                description="Learn to use AI via our e-Learning system and earn badges"
            />
            <IconCard 
                :icon="BookOpenCheck" 
                icon-color="brand-dark-blue" 
                size="xl" 
                title="Test" 
                description="Test your knowledge from Beginner to Master and level up"
            />
            <IconCard 
                :icon="Star" 
                icon-color="yellow-400" 
                size="xl" 
                title="Earn" 
                description="Gain access to exclusive AI tools once you passed the criteria"
            />
        </div>
    </div>
</template>
