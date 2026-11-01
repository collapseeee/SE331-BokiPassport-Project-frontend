<script lang="ts" setup>
import { ArcElement, Chart, Legend, Title, Tooltip, type ChartData, type ChartOptions } from 'chart.js';
import { Doughnut } from 'vue-chartjs';

Chart.register(Title, Tooltip, Legend, ArcElement);

defineProps<{
    chartData: ChartData<'doughnut'>;
    chartOptions?: ChartOptions<'doughnut'>;
}>();
</script>

<template>
    <div class="relative w-full h-full">
        <Doughnut :data="chartData" :options="chartOptions" />
    </div>
</template>