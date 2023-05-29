<script setup>
import { ref } from 'vue';
import StatChart from '@/components/charts/statChart.vue';
import { useUsersStore } from '@/stores/users.js';
import HomeButton from '@/components/homeButton.vue';
import GameButton from '@/components/gameButton.vue';
const props = defineProps({
  player: String
});

const usersStore = useUsersStore();
const statistic = ref(null);
getStatistic(props.player);

const messageError = ref('');
async function getStatistic(player) {
  const URI = `${import.meta.env.VITE_BACKEND_URI}/statistic/get`;
  const fetchParams = {
    method: 'POST',
    body: JSON.stringify({
      refreshToken: usersStore.users[player]?.refreshToken || ''
    }),
    headers: {
      authorization: `Bearer ${usersStore.users[player]?.token}`,
      'Content-Type': 'application/json'
    }
  };
  let response;
  let json;

  try {
    response = await fetch(URI, fetchParams);
    json = await response.json();
  } catch (error) {
    console.error(error);
    messageError.value = 'Ошибка сервера получении статистики';
    return;
  }

  if (json && Object.hasOwn(json, 'newTokens')) {
    usersStore.updateTokens(
      player,
      json.newTokens.token,
      json.newTokens.refreshToken
    );
    const user = JSON.parse(localStorage.getItem(`user${player}`));
    user.token = json.newTokens.token;
    user.refreshToken = json.newTokens.refreshToken;
    localStorage.setItem(`user${player}`, JSON.stringify(user));
  }

  if (json && Object.hasOwn(json, 'error')) {
    console.error(json.error);
    messageError.value = json.error;
    return;
  }

  if (!json || (!response.ok && !Object.hasOwn(json, 'error'))) {
    messageError.value = 'Не удалось получить статистику';
    return;
  }

  statistic.value = json.statistic;
  if (!statistic.value[0]) messageError.value = 'Статистика отсутствует';
}
</script>

<template>
  <div class="page user-profile">
    <HomeButton />
    <GameButton />
    <div class="user-profile__information user-information">
      <div class="user-information__avatar avatar">
        <img
          class="avatar__img"
          src="/src/assets/images/yes_login.svg"
          alt="avatar"
        />
      </div>
      <h3 class="user-information__name">
        {{ usersStore.users[props.player].name }}
      </h3>
    </div>

    <div v-if="statistic" class="charts">
      <template v-for="(statisticParameter, key) in statistic" :key="key">
        <StatChart
          v-if="statisticParameter[0]"
          :parameterName="key"
          :chartData="statisticParameter"
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
@use '@/assets/css/mixins/fonts.scss';

.user-information {
  display: flex;
  align-items: flex-start;
  margin-top: 32px;

  &__name {
    font-size: 48px;
  }
}

.avatar {
  border: 1px solid black;
  border-radius: 50%;

  &__img {
    display: block;
    width: 256px;
    height: 256px;
  }
}

.charts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-self: center;
  margin-bottom: 64px;
}

.loading-message {
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  padding: 32px 16px;
  border: 1px solid black;
  border-radius: 8px;
  font-size: 48px;
}
</style>
