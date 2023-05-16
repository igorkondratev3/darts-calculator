<script setup>
import { ref, defineAsyncComponent } from 'vue';
import { useUsersStore } from '@/stores/users.js';
import LoadingComponent from '@/components/loadingComponent.vue';
import AuthActions from '@/components/auth/authActions/authActions.vue';
import AuthState from '@/components/auth/authState.vue';

const emits = defineEmits(['startNewGame']);
const props = defineProps({
  nameP1: String,
  nameP2: String,
  wonP1: Number,
  wonP2: Number,
  legsWonInGameP1: Number,
  legsWonInGameP2: Number,
  gameStatisticP1: Object,
  gameStatisticP2: Object,
  isPercentDoubleInStatP1: Boolean,
  isPercentDoubleInStatP2: Boolean,
  legNumber: Number
});
const usersStore = useUsersStore();

const isStatisticSave = {
  P1: ref(false),
  P2: ref(false)
};

const showDone = {
  P1: ref(false),
  P2: ref(false)
};

const setstatisticInDB = async (player) => {
  isStatisticSave[player].value = true;
  const gameStatistic = {};
  for (const key in props[`gameStatistic${player}`])
    gameStatistic[key] = props[`gameStatistic${player}`][key].value;

  if (!props[`isPercentDoubleInStat${player}`]) {
    delete gameStatistic.percentDouble;
  }

  const URI = `${import.meta.env.VITE_BACKEND_URI}/statistic/set`;
  const fetchParams = {
    method: 'POST',
    body: JSON.stringify({
      refreshToken: usersStore.users[player]?.refreshToken || '',
      statistic: gameStatistic,
      legs: props.legNumber,
      legsWon: props[`legsWonInGame${player}`],
      legsLose: props.legNumber - props[`legsWonInGame${player}`],
      timeZone: new Date().getTimezoneOffset() / 60
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
    console.log(error);
    isStatisticSave[player].value = false;
    return;
  }

  if (json && Object.hasOwn(json, 'newTokens')) {
    usersStore.updateTokens(
      player,
      json.newTokens.token,
      json.newTokens.refreshToken
    );
    console.log(usersStore.users[player]);
    const user = JSON.parse(localStorage.getItem(`user${player}`));
    user.token = json.newTokens.token;
    user.refreshToken = json.newTokens.refreshToken;
    localStorage.setItem(`user${player}`, JSON.stringify(user));
  }

  if (!json || (!response.ok && !Object.hasOwn(json, 'error'))) {
    console.log(json, '1');
    isStatisticSave[player].value = false;
    return;
    //    return { error: 'Неизвестная ошибка' };
  }
  showDone[player].value = true;
};

const startNewGame = () => {
  isStatisticSave.P1.value = false;
  isStatisticSave.P2.value = false;
  showDone.P1.value = false;
  showDone.P2.value = false;
  emits('startNewGame');
};

const seenAuthCompP1 = ref(false);
const seenAuthCompP2 = ref(false);
const AuthComp = defineAsyncComponent({
  loader: () => import('@/components/auth/authComp.vue'),
  loadingComponent: LoadingComponent,
  delay: 0
});
</script>

<template>
  <div
    class="dialog-content-wrapper game-over"
    v-show="!seenAuthCompP1 && !seenAuthCompP2"
  >
    <AuthComp
      v-if="seenAuthCompP1"
      @closeAuthComp="seenAuthCompP1 = false"
      player="P1"
    />
    <AuthComp
      v-if="seenAuthCompP2"
      @closeAuthComp="seenAuthCompP2 = false"
      player="P2"
    />
    <div class="wrap-go">
      <h2 class="game-over__message">Матч окончен</h2>

      <div class="game-over__statistic-wrapper">
        <AuthState player="P1" backgroundColor="rgb(182, 195, 197)" />
        <AuthState player="P2" backgroundColor="rgb(182, 195, 197)" />
        <!--нужен для корректной работы transform translate - элемент скрывается из-за -->
        <button
          class="game-statistic__save game-statistic__save_left"
          @click="setstatisticInDB('P1')"
          title="сохранить статистику матча"
          v-if="usersStore.users.P1 && !showDone.P1.value"
          :disabled="isStatisticSave.P1.value"
        >
          <img
            class="save-icon"
            src="/src/assets/images/add_circle.svg"
            alt="add"
          />
        </button>
        <img
          v-if="usersStore.users.P1 && showDone.P1.value"
          class="save-icon save-icon_left"
          src="/src/assets/images/done.svg"
          alt="done"
        />
        <button
          class="game-statistic__save game-statistic__save_right"
          @click="setstatisticInDB('P2')"
          title="сохранить статистику матча"
          v-if="usersStore.users.P2 && !showDone.P2.value"
          :disabled="isStatisticSave.P2.value"
        >
          <img
            class="save-icon"
            src="/src/assets/images/add_circle.svg"
            alt="add"
          />
        </button>
        <img
          v-if="usersStore.users.P2 && showDone.P2.value"
          class="save-icon save-icon_right"
          src="/src/assets/images/done.svg"
          alt="done"
        />

        <div class="game-over__statistic game-statistic">
          <AuthActions player="P1" @openAuthComp="seenAuthCompP1 = true" />
          <AuthActions player="P2" @openAuthComp="seenAuthCompP2 = true" />
          <div class="game-statistic__player-names game-statistic-player-names">
            <div
              class="game-statistic-player-names__name game-statistic-player-names__name_margin-right"
            >
              {{ props.nameP1 }}
            </div>
            <div class="game-statistic-player-names__name">
              {{ props.nameP2 }}
            </div>
          </div>
          <div class="game-statistic__result game-result">
            <div
              class="game-result__player-score game-result__player-score_margin-right"
            >
              {{ props.wonP1 }}
            </div>
            <div class="game-result__player-score">{{ props.wonP2 }}</div>
          </div>
          <div class="game-statistic__header-group">Средний набор</div>
          <div class="game-statistic__parameters statistic-parameters">
            <div class="statistic-parameters__values">
              {{ props.gameStatisticP1.averagePoints.value.toFixed(2) }}
            </div>
            <div class="statistic-parameters__header">матч</div>
            <div class="statistic-parameters__values">
              {{ props.gameStatisticP2.averagePoints.value.toFixed(2) }}
            </div>
          </div>
          <div class="game-statistic__parameters statistic-parameters">
            <div class="statistic-parameters__values">
              {{ props.gameStatisticP1.averagePointsWinLegs.value.toFixed(2) }}
            </div>
            <div class="statistic-parameters__header">выигранные леги</div>
            <div class="statistic-parameters__values">
              {{ props.gameStatisticP2.averagePointsWinLegs.value.toFixed(2) }}
            </div>
          </div>
          <div class="game-statistic__parameters statistic-parameters">
            <div class="statistic-parameters__values">
              {{ props.gameStatisticP1.averagePointsLoseLegs.value.toFixed(2) }}
            </div>
            <div class="statistic-parameters__header">проигранные леги</div>
            <div class="statistic-parameters__values">
              {{ props.gameStatisticP2.averagePointsLoseLegs.value.toFixed(2) }}
            </div>
          </div>
          <div class="game-statistic__parameters statistic-parameters">
            <div class="statistic-parameters__values">
              {{ props.gameStatisticP1.averageFirstNineDarts.value.toFixed(2) }}
            </div>
            <div class="statistic-parameters__header">9 дротиков</div>
            <div class="statistic-parameters__values">
              {{ props.gameStatisticP2.averageFirstNineDarts.value.toFixed(2) }}
            </div>
          </div>
          <div class="game-statistic__header-group">Очки</div>
          <div class="game-statistic__parameters statistic-parameters">
            <div class="statistic-parameters__values">
              {{ props.gameStatisticP1.p180.value }}
            </div>
            <div class="statistic-parameters__header">180</div>
            <div class="statistic-parameters__values">
              {{ props.gameStatisticP2.p180.value }}
            </div>
          </div>
          <div class="game-statistic__parameters statistic-parameters">
            <div class="statistic-parameters__values">
              {{ props.gameStatisticP1.p171.value }}
            </div>
            <div class="statistic-parameters__header">171+</div>
            <div class="statistic-parameters__values">
              {{ props.gameStatisticP2.p171.value }}
            </div>
          </div>
          <div class="game-statistic__parameters statistic-parameters">
            <div class="statistic-parameters__values">
              {{ props.gameStatisticP1.p131.value }}
            </div>
            <div class="statistic-parameters__header">131+</div>
            <div class="statistic-parameters__values">
              {{ props.gameStatisticP2.p131.value }}
            </div>
          </div>
          <div class="game-statistic__parameters statistic-parameters">
            <div class="statistic-parameters__values">
              {{ props.gameStatisticP1.p96.value }}
            </div>
            <div class="statistic-parameters__header">96+</div>
            <div class="statistic-parameters__values">
              {{ props.gameStatisticP2.p96.value }}
            </div>
          </div>
          <div class="game-statistic__header-group">Закрытия</div>
          <div
            class="game-statistic__parameters statistic-parameters"
            v-if="
              props.isPercentDoubleInStatP1 || props.isPercentDoubleInStatP2
            "
          >
            <div class="statistic-parameters__values">
              <span v-if="props.isPercentDoubleInStatP1">
                {{ props.gameStatisticP1.percentDouble.value.toFixed(2) }} %
              </span>
            </div>
            <div class="statistic-parameters__header">%</div>
            <div class="statistic-parameters__values">
              <span v-if="props.isPercentDoubleInStatP2">
                {{ props.gameStatisticP2.percentDouble.value.toFixed(2) }} %
              </span>
            </div>
          </div>
          <div class="game-statistic__parameters statistic-parameters">
            <div class="statistic-parameters__values">
              {{ props.gameStatisticP1.highestCheckout.value }}
            </div>
            <div class="statistic-parameters__header">наибольшее</div>
            <div class="statistic-parameters__values">
              {{ props.gameStatisticP2.highestCheckout.value }}
            </div>
          </div>
        </div>
      </div>

      <button class="game-over__new-game-button" @click="startNewGame">
        Новый матч
      </button>
    </div>
  </div>
</template>

<style lang="scss">
//dialog-content-wrapper на главной странице
.wrap-go {
  display: flex;
  flex-direction: column;
  align-self: center;
}

.game-over {
  &__message {
    font-size: 64px;
    font-weight: 700;
    color: rgb(182, 195, 197);
    text-align: center;
    margin-bottom: 8px;
  }

  &__statistic {
    display: flex;
    flex-direction: column;
    min-height: 200px;
    max-height: 80vh;
    padding: 16px;
    padding-top: 24px;
    padding-left: 32px;
    padding-right: 32px;
    border-radius: 16px;
    overflow: auto;
    overscroll-behavior: none;
    background-color: rgb(182, 195, 197);

    &::-webkit-scrollbar {
      display: none;
    }

    &::-webkit-scrollbar-track {
      display: none;
    }

    &::-webkit-scrollbar-thumb {
      display: none;
    }

    scrollbar-width: none;
  }
}

.game-statistic-player-names {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  &__name {
    max-width: 400px;
    font-size: 48px;
    text-align: center;
    overflow: hidden;
  }

  &__name_margin-right {
    margin-right: 96px;
  }
}

.game-result {
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  &__player-score {
    font-size: 48px;
    text-align: center;
  }

  &__player-score_margin-right {
    margin-right: 96px;
  }
}

.game-statistic {
  &__header-group {
    margin-top: 16px;
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    color: white;
  }

  &__parameters {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 8px;
  }
}

.statistic-parameters {
  &__values {
    align-self: center;
    width: 33%;
    font-size: 24px;
    text-align: center;
  }

  &__header {
    align-self: center;
    width: 33%;
    margin-left: 16px;
    margin-right: 16px;
    font-size: 24px;
    text-align: center;
  }
}

.game-over__new-game-button {
  margin-top: 16px;
  padding: 24px;
  border-radius: 8px;
  font: inherit;
  background-color: rgb(221, 231, 231);
  transition: background-color 0.5s linear, color 0.5s linear;

  &:hover {
    background-color: black;
    color: white;
  }

  &:focus {
    background-color: black;
    color: white;
  }
}

.game-statistic__save {
  position: absolute;
  top: 32px;
  border-radius: 8px;
  cursor: pointer;
  background-color: rgb(182, 195, 197);

  &_left {
    left: 0;
    transform: translateX(calc(-100% - 8px));
  }

  &_right {
    right: 0;
    transform: translateX(calc(100% + 8px));
  }

  &:focus {
    outline: 1px solid white;
    outline-offset: 4px;
  }

  &:disabled {
    background-color: rgb(107, 107, 107);
  }
}

.save-icon {
  width: 32px;
  height: 32px;
  display: block;
}

.save-icon_left {
  position: absolute;
  top: 36px;
  left: -36px;
}

.save-icon_right {
  position: absolute;
  top: 36px;
  right: -36px;
}

.auth-person-gs {
  position: sticky;
  top: 3px;
  margin-top: 3px;
  background-color: rgb(177, 205, 223);
  width: 28px;
  height: 28px;
  border: 1px solid black;
  border-radius: 50%;

  &_order_2 {
    order: 2;
  }

  &__icon {
    width: 24px;
    height: 24px;
    display: block;
  }
}
</style>
