<script lang="ts" setup>
import ServiceCard from '@/components/cards/ServiceCard.vue';
import { useServicesStore } from '@/stores/services';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const userLevel = authStore.level;

const servicesStore = useServicesStore();
const { services } = storeToRefs(servicesStore);

const loadingMessage = ref('Loading services...');

</script>
<template>
    <div class="flex flex-col items-center py-8">
        <h1>Services and Benefits</h1>
        <div v-if="services" class="grid grid-cols-1 md:grid-cols-2 gap-8 w-4/5 px-12 py-8">
            <ServiceCard 
                v-for="service in services" 
                :key="service.id" 
                :service="service"
                :user-level="Number(userLevel)"
            />
        </div>
        <div v-else class="flex flex-col items-center justify-center">
            <p>{{ loadingMessage }}</p>
        </div>
    </div>
</template>
