<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import FilterSelect from './FilterSelect.vue';
import { ref, watch } from 'vue';

const router = useRouter()
const route = useRoute()

defineProps<{
    provinces: Array<string>
}>()

const tabs: Map<string, string> = new Map([
    ['All', 'all'],
    ['Level 1', '1'],
    ['Level 2', '2'],
    ['Level 3', '3'],
    ['Level 4', '4']
])

const levelClasses = 'text-brand-blue hover:bg-brand-blue/30 rounded-xl px-3 py-2 transition-all'

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
/* Watch the changes of searchValue then update queries */
watch(() => searchValue.value, () => {
    updateSearchFilter()
})

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
    <div class="flex flex-row gap-x-2 items-center pb-2 w-full">
        <RouterLink :to="{ query: { ...$route.query, level: tab[1] }}" :class="levelClasses" v-for="tab in tabs" :label="tab[0]" :key="tab[0]">{{ tab[0] }}</RouterLink>
        <input v-model="searchValue" class="rounded-full border-none bg-brand-white h-full px-3" placeholder="Search..."/>
        <FilterSelect @select-province="updateProvinceFilter" :options="provinces"/>
        <RouterLink :to="{ name: 'AdminUserManagement' }" class="text-brand-gray underline hover">Reset filter</RouterLink>
    </div>
</template>