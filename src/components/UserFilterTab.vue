<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import SelectInput from './select/SelectInput.vue';

const router = useRouter()
const route = useRoute()

defineProps<{
    provinces: Array<string>
}>()

const tabs: Map<string, string> = new Map([
    ['All', 'all'],
    ['1', '1'],
    ['2', '2'],
    ['3', '3'],
    ['4', '4']
])

const levelClasses = 'text-brand-blue h-full hover:bg-brand-blue/30 rounded-xl px-4 py-2 transition-all'

/* Filter by searching name */
const searchValue = ref<string>('');
const updateSearchFilter = () => {
    router.push({
        query: {
            ...route.query,
            search: searchValue.value
        }
    })
}

/* Filter by province */
const updateProvinceFilter = (newProvince: string) => {
    router.push({
        query: {
            ...route.query,
            province: newProvince
        }
    })
}
</script>


<template>
    <div class="flex flex-row gap-x-2 items-center justify-start pb-3 w-full px-4.5">
        <!-- 0 means key, 1 means value (Map data structure) -->
        <p class="text-brand-white">Level:</p>
        <RouterLink :to="{ query: { ...$route.query, level: tab[1] }}" :class="[levelClasses, { 'bg-brand-black font-bold': route.query.level === tab[1] }, {'bg-brand-black font-bold': tab[1] === 'all' && route.query.level === undefined}]" v-for="tab in tabs" :key="tab[0]">{{ tab[0] }}</RouterLink>
        <label hidden for="search-input">{{  }}</label>
        <input id="search-input" @input="updateSearchFilter" v-model="searchValue" class="rounded-full border-none bg-brand-white w-full max-w-lg px-3 py-3" placeholder="Search..."/>
        <SelectInput chooseAll name="province" @update-value="updateProvinceFilter" :options="provinces"/>
        <RouterLink :to="{ name: 'AdminUserManagement' }" class="text-brand-gray underline hover">Reset</RouterLink>
    </div>
</template>