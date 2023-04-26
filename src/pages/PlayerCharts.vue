<script setup>
import StatCharts from '@/components/charts/statCharts.vue';
</script>

<template>
<StatCharts 
parameterName = 'AveragesAV'
:chartData = "[
  { date: '22-04-2022', value: 110.6 },
  { date: '14-07-2022', value: 75.6 },
  { date: '22-04-2022', value: 42.5 },
  { date: '29-05-2022', value: 81.6 },
  { date: '22-12-2022', value: 49.6 },
  { date: '22-04-2022', value: 58.4 },
  { date: '12-11-2022', value: 45.6 },
  { date: '22-04-2022', value: 70.9 },
  { date: '02-10-2022', value: 74.6 },
  { date: '19-04-2022', value: 60.2 },
  { date: '22-04-2022', value: 41.6 },
  { date: '07-09-2022', value: 67.6 }
]"
/>
</template>

<style>

</style>