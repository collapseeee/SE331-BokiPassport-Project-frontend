<script setup lang="ts">
import { onMounted, ref } from 'vue';
import UserFilterTab from './UserFilterTab.vue';
import UserService from '@/services/UserService.ts';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    isPagination: {
        type: Boolean,
        required: false
    },
    isFilter: {
        type: Boolean,
        required: false
    }
})
const provinces = ref<string[] | null>([])
onMounted(() => {
    if (props.isFilter) {
        UserService.getProvinces()
            .then(res => provinces.value = res.data)
    }
})

</script>

<template>
    <div class="flex flex-col w-4/5 items-center bg-brand-dark-blue py-5 rounded-xl">
        <UserFilterTab v-if="isFilter && provinces" :provinces="provinces"/>
        <h5 v-else class="text-brand-white w-full text-left pl-5 pb-4">{{ title }}</h5>
        <div class="w-full h-full bg-brand-white">
            <slot/>
        </div>
    </div>
</template>