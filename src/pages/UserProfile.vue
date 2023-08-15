<script setup>
import HomeButton from '@/components/homeButton.vue';
import GameButton from '@/components/gameButton.vue';
import UserProfile from '@/components/userProfilePage/userProfile/userProfile.vue';
import StatChart from '@/components/userProfilePage/statChart/statChart.vue';
import ChartSetting from '@/components/userProfilePage/chartSettings/chartSettings.vue';
import { useUsersStore } from '@/stores/users.js';
import { useStatistic } from '@/composables/userProfile/statistic.js';

const props = defineProps({
  player: String
});

const usersStore = useUsersStore();

const { statistic, messageError, chartsSettings, getStatNamesWithValues } =
  useStatistic(props.player, usersStore);
</script>

<template>
  <div class="page user-profile">
    <HomeButton />
    <GameButton />
    <UserProfile :player="player" />
    <div v-if="statistic" class="charts">
      <ChartSetting
        v-model:globalVisibilityOfZeroValues="chartsSettings.zeroSeen.value"
        :visibleCharts="chartsSettings.visible.value"
        @update:visibleCharts="chartsSettings.updateVisibleCharts"
        :chartNames="getStatNamesWithValues(statistic)"
        :minChartDate="chartsSettings.minDate"
        :maxChartDate="chartsSettings.maxDate"
        @updateDates="chartsSettings.globalRangeDate.value.updateGlobalDates"
      />
      <template v-for="(statisticParameter, key) in statistic" :key="key">
        <StatChart
          v-if="chartsSettings.visible.value.has(key) && statisticParameter[0]"
          :chartName="key"
          :chartData="statisticParameter"
          :globalVisibilityOfZeroValues="chartsSettings.zeroSeen.value"
          :globalRangeDate="chartsSettings.globalRangeDate.value"
        />
      </template>
    </div>
    <div v-else class="loading-message">
      {{ messageError || 'Загружается статистика игрока' }}
    </div>
  </div>

  <!--
  <StatChart
    parameterName="AveragesAV"
    :chartData="[
      { date: '22-04-2022', value: 110.6 },
      { date: '23-04-2022', value: 75.6 },
      { date: '24-04-2022', value: 42.5 },
      { date: '25-04-2022', value: 81.6 },
      { date: '26-04-2022', value: 49.6 },
      { date: '27-04-2022', value: 58.4 },
      { date: '28-04-2022', value: 45.6 },
      { date: '29-04-2022', value: 70.9 },
      { date: '30-04-2022', value: 74.6 },
      { date: '01-05-2022', value: 60.2 },
      { date: '02-05-2022', value: 41.6 },
      { date: '03-05-2022', value: 67.6 },
      { date: '04-05-2022', value: 110.6 },
      { date: '05-05-2022', value: 75.6 },
      { date: '06-05-2022', value: 42.5 },
      { date: '07-05-2022', value: 81.6 },
      { date: '08-05-2022', value: 49.6 },
      { date: '09-05-2022', value: 58.4 },
      { date: '10-05-2022', value: 45.6 },
      { date: '11-05-2022', value: 70.9 },
      { date: '12-05-2022', value: 74.6 },
      { date: '13-05-2022', value: 60.2 },
      { date: '14-05-2022', value: 41.6 },
      { date: '15-05-2022', value: 67.6 },
      { date: '16-05-2022', value: 110.6 },
      { date: '17-05-2022', value: 75.6 },
      { date: '18-05-2022', value: 42.5 },
      { date: '19-05-2022', value: 81.6 },
      { date: '20-05-2022', value: 49.6 },
      { date: '21-05-2022', value: 58.4 },
      { date: '22-05-2022', value: 45.6 },
      { date: '23-05-2022', value: 70.9 },
      { date: '24-05-2022', value: 74.6 },
      { date: '25-05-2022', value: 60.2 },
      { date: '26-05-2022', value: 41.6 },
      { date: '27-05-2022', value: 67.6 },
      { date: '28-05-2022', value: 110.6 },
      { date: '29-05-2022', value: 75.6 },
      { date: '30-05-2022', value: 42.5 },
      { date: '01-06-2022', value: 60.2 },
      { date: '02-06-2022', value: 41.6 },
      { date: '03-06-2022', value: 67.6 },
      { date: '04-06-2022', value: 110.6 },
      { date: '05-06-2022', value: 75.6 },
      { date: '06-06-2022', value: 42.5 },
      { date: '07-06-2022', value: 81.6 },
      { date: '08-06-2022', value: 49.6 },
      { date: '09-06-2022', value: 58.4 },
      { date: '10-06-2022', value: 45.6 },
      { date: '11-06-2022', value: 70.9 },
      { date: '12-06-2022', value: 74.6 },
      { date: '13-06-2022', value: 60.2 },
      { date: '14-06-2022', value: 41.6 },
      { date: '15-06-2022', value: 67.6 },
      { date: '16-06-2022', value: 110.6 },
      { date: '17-06-2022', value: 75.6 },
      { date: '18-06-2022', value: 42.5 },
      { date: '19-06-2022', value: 81.6 },
      { date: '20-06-2022', value: 49.6 },
      { date: '21-06-2022', value: 58.4 },
      { date: '22-06-2022', value: 45.6 },
      { date: '23-06-2022', value: 70.9 },
      { date: '24-06-2022', value: 74.6 },
      { date: '25-06-2022', value: 60.2 },
      { date: '26-06-2022', value: 41.6 },
      { date: '27-06-2022', value: 67.6 },
      { date: '28-06-2022', value: 110.6 },
      { date: '29-06-2022', value: 75.6 },
      { date: '30-06-2022', value: 42.5 },
      { date: '01-07-2022', value: 60.2 },
      { date: '02-07-2022', value: 41.6 },
      { date: '03-07-2022', value: 67.6 },
      { date: '04-07-2022', value: 110.6 },
      { date: '05-07-2022', value: 75.6 },
      { date: '06-07-2022', value: 42.5 },
      { date: '07-07-2022', value: 81.6 },
      { date: '08-07-2022', value: 49.6 },
      { date: '09-07-2022', value: 58.4 },
      { date: '10-07-2022', value: 45.6 },
      { date: '11-07-2022', value: 70.9 },
      { date: '12-07-2022', value: 74.6 },
      { date: '13-07-2022', value: 60.2 },
      { date: '14-07-2022', value: 41.6 },
      { date: '15-07-2022', value: 67.6 },
      { date: '16-07-2022', value: 110.6 },
      { date: '17-07-2022', value: 75.6 },
      { date: '18-07-2022', value: 42.5 },
      { date: '19-07-2022', value: 81.6 },
      { date: '20-07-2022', value: 49.6 },
      { date: '21-07-2022', value: 58.4 },
      { date: '22-07-2022', value: 45.6 },
      { date: '23-07-2022', value: 70.9 },
      { date: '24-07-2022', value: 74.6 },
      { date: '25-07-2022', value: 60.2 },
      { date: '26-07-2022', value: 41.6 },
      { date: '27-07-2022', value: 67.6 },
      { date: '28-07-2022', value: 110.6 },
      { date: '29-07-2022', value: 75.6 },
      { date: '30-07-2022', value: 42.5 },
      { date: '01-08-2022', value: 60.2 },
      { date: '02-08-2022', value: 41.6 },
      { date: '03-08-2022', value: 67.6 },
      { date: '04-08-2022', value: 110.6 },
      { date: '05-08-2022', value: 75.6 },
      { date: '06-08-2022', value: 42.5 },
      { date: '07-08-2022', value: 81.6 },
      { date: '08-08-2022', value: 49.6 },
      { date: '09-08-2022', value: 58.4 },
      { date: '10-08-2022', value: 45.6 },
      { date: '11-08-2022', value: 70.9 },
      { date: '12-08-2022', value: 74.6 },
      { date: '13-08-2022', value: 60.2 },
      { date: '14-08-2022', value: 41.6 },
      { date: '15-08-2022', value: 67.6 },
      { date: '16-08-2022', value: 110.6 },
      { date: '17-08-2022', value: 75.6 },
      { date: '18-08-2022', value: 42.5 },
      { date: '19-08-2022', value: 81.6 },
      { date: '20-08-2022', value: 49.6 },
      { date: '21-08-2022', value: 58.4 },
      { date: '22-08-2022', value: 45.6 },
      { date: '23-08-2022', value: 70.9 },
      { date: '24-08-2022', value: 74.6 },
      { date: '25-08-2022', value: 60.2 },
      { date: '26-08-2022', value: 41.6 },
      { date: '27-08-2022', value: 67.6 },
      { date: '28-08-2022', value: 110.6 },
      { date: '29-08-2022', value: 75.6 },
      { date: '30-08-2022', value: 42.5 },
      { date: '01-09-2022', value: 60.2 },
      { date: '02-09-2022', value: 41.6 },
      { date: '03-09-2022', value: 67.6 },
      { date: '04-09-2022', value: 110.6 },
      { date: '05-09-2022', value: 75.6 },
      { date: '06-09-2022', value: 42.5 },
      { date: '07-09-2022', value: 81.6 },
      { date: '08-09-2022', value: 49.6 },
      { date: '09-09-2022', value: 58.4 },
      { date: '10-09-2022', value: 45.6 },
      { date: '11-09-2022', value: 70.9 },
      { date: '12-09-2022', value: 74.6 },
      { date: '13-09-2022', value: 60.2 },
      { date: '14-09-2022', value: 41.6 },
      { date: '15-09-2022', value: 67.6 },
      { date: '16-09-2022', value: 110.6 },
      { date: '17-09-2022', value: 75.6 },
      { date: '18-09-2022', value: 42.5 },
      { date: '19-09-2022', value: 81.6 },
      { date: '20-09-2022', value: 49.6 },
      { date: '21-09-2022', value: 58.4 },
      { date: '22-09-2022', value: 45.6 },
      { date: '23-09-2022', value: 70.9 },
      { date: '24-09-2022', value: 74.6 },
      { date: '25-09-2022', value: 60.2 },
      { date: '26-09-2022', value: 41.6 },
      { date: '27-09-2022', value: 67.6 },
      { date: '28-09-2022', value: 110.6 },
      { date: '29-09-2022', value: 75.6 },
      { date: '30-09-2023', value: 42.5 }
    ]"
  />
  -->
</template>

<style lang="scss">
.charts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-self: center;
  margin-bottom: calc(var(--base) * 0.64);
  margin-top: calc(var(--base) * 0.32);
}

.settings-button {
  align-self: flex-start;
  border-radius: 50%;
  transition: background-color 0.2s linear;

  &:focus-visible {
    outline: calc(var(--base) * 0.01) solid black;
    outline-offset: calc(var(--base) * 0.02);
  }

  &:hover {
    background-color: #aca6a6;
  }

  &:active {
    box-shadow: 0px calc(var(--base) * 0.05) calc(var(--base) * 0.05) gray;
  }
}
.icon-32 {
  display: block;
  width: calc(var(--base) * 0.32);
  height: calc(var(--base) * 0.32);
}

.loading-message {
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  padding: calc(var(--base) * 0.32) calc(var(--base) * 0.16);
  border: calc(var(--base) * 0.01) solid black;
  border-radius: calc(var(--base) * 0.08);
  font-size: calc(var(--base) * 0.48);
}

@media (max-width: 440px) {
  .charts {
    margin-left: calc(var(--base) * 0.32);
  }
}

@media (max-width: 375px) {
  .charts {
    margin-left: calc(var(--base) * 0.64);
  }
}
</style>
