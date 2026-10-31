<script setup lang="ts">
import { ChevronLeft, ChevronRight } from '@lucide/vue';
import { computed, ref, watch } from 'vue';
const props = defineProps<{
    page: number,
    totalItems: number,
    hasNextPage: boolean,
    currentItems: number
}>()

const displayedItems = computed<number>(() => {
    if (!hasNextPage.value) {
        return props.totalItems
    }
    return props.currentItems * props.page
})
const currentPage = computed<number>(() => props.page)
const hasNextPage = computed<boolean>(() => props.hasNextPage)
const totalPage = computed<number>(() => Math.ceil(props.totalItems / 5))
const inputPage = ref<number>(currentPage.value)

const buttonClass = 'hover:bg-brand-black hover:text-brand-blue rounded-lg transition-colors'

watch(() => currentPage.value, () => {
    inputPage.value = Number(currentPage.value)
})
</script>

<template>
    <div class="flex justify-between text-brand-white items-center px-5 pt-5 w-full bg-brand-dark-blue">
        <p class="text-sm">Page {{ currentPage }}/{{ totalPage }} - Displayed {{ displayedItems }} / {{ totalItems }}</p>
        <div class="flex items-center gap-x-5">
            <RouterLink :class="[{'pointer-events-none bg cursor-default text-brand-gray/20': currentPage <= 1}, buttonClass]" :to="{ query: { ...$route.query, page: currentPage - 1 } }">
                <ChevronLeft class="size-8"/>
            </RouterLink>
            <label hidden for="page-input">{{  }}</label>
            <input id="page-input" maxlength="3" v-model="inputPage" @change="() => $router.push({ query: { ...$route.query, page: Number(inputPage) }})" class="p-2 size-10 items-center text-center truncate bg-white text-brand-black rounded-xl"/>
            <RouterLink :class="[{'pointer-events-none bg cursor-default text-brand-gray/20': !hasNextPage}, buttonClass]" :to="{ query: { ...$route.query, page: Number(currentPage) + 1 } }">
                <ChevronRight class="size-8"/>
            </RouterLink>
        </div>
    </div>
</template>