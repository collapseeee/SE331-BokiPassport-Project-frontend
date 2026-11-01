<script lang="ts" setup>
import { BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip, type ChartData, type ChartOptions } from 'chart.js';
import { Bar } from 'vue-chartjs'

Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

defineProps<{
    chartData: ChartData<'bar'>
    chartOptions?: ChartOptions<'bar'>
}>()

</script>
<template>
    <div class="relative w-full h-full flex justify-center items-center">
        <Bar :data="chartData" :options="chartOptions" />
    </div>
</template>