<script setup>
import { ref, defineAsyncComponent } from 'vue';
import LoadingAuth from '@/components/auth/components/loadingAuth.vue';
import AuthActions from '@/components/auth/authActions/authActions.vue';
import AuthState from '@/components/auth/authState.vue';
import SaveStatistic from './components/saveStatistic.vue';
import GameAverage from './components/gameAverage.vue';
import GamePoints from './components/gamePoints.vue';
import GameCheckout from './components/gameCheckout.vue';

defineEmits(['startNewGame']);
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

const seenAuthCompP1 = ref(false);
const seenAuthCompP2 = ref(false);
const AuthComp = defineAsyncComponent({
  loader: () => import('@/components/auth/authComp.vue'),
  loadingComponent: LoadingAuth,
  delay: 0
});

const popUpSeen = ref(false);
const popUpMessage = ref('');
const wherePopUp = ref('');
const PopUp = defineAsyncComponent({
  loader: () => import('@/components/popUp.vue')
});
const showPopUp = (message, where) => {
  popUpMessage.value = message;
  wherePopUp.value = where;
  popUpSeen.value = true;
};
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
    <div class="game-over__content-wrapper">
      <h2 class="game-over__header">Матч окончен</h2>
      <div class="game-over__statistic-wrapper">
        <!--нужен для корректной работы transform translate - элемент скрывается из-за overflow-->
        <AuthState player="P1" backgroundColor="rgb(182, 195, 197)" />
        <AuthState player="P2" backgroundColor="rgb(182, 195, 197)" />
        <SaveStatistic
          player="P1"
          :gameStatistic="props.gameStatisticP1"
          :isPercentDoubleInStat="props.isPercentDoubleInStatP1"
          :legNumber="props.legNumber"
          :legsWonInGame="legsWonInGameP1"
          @showPopUp="(message) => showPopUp(message, 'left')"
        />
        <SaveStatistic
          player="P2"
          :gameStatistic="props.gameStatisticP2"
          :isPercentDoubleInStat="props.isPercentDoubleInStatP2"
          :legNumber="props.legNumber"
          :legsWonInGame="legsWonInGameP2"
          @showPopUp="(message) => showPopUp(message, 'right')"
        />
        <div class="game-over__statistic game-statistic">
          <div class="auth-actions-wrapper">
            <AuthActions player="P1" @openAuthComp="seenAuthCompP1 = true" />
            <AuthActions player="P2" @openAuthComp="seenAuthCompP2 = true" />
          </div>
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
          <GameAverage
            :gameStatisticP1="props.gameStatisticP1"
            :gameStatisticP2="props.gameStatisticP2"
          />
          <GamePoints
            :gameStatisticP1="props.gameStatisticP1"
            :gameStatisticP2="props.gameStatisticP2"
          />
          <GameCheckout
            :gameStatisticP1="props.gameStatisticP1"
            :gameStatisticP2="props.gameStatisticP2"
            :isPercentDoubleInStatP1="props.isPercentDoubleInStatP1"
            :isPercentDoubleInStatP2="props.isPercentDoubleInStatP2"
          />
        </div>
      </div>
      <button
        class="base-button game-over__new-game"
        @click="$emit('startNewGame')"
      >
        Новый матч
      </button>
    </div>
    <PopUp
      :popUpSeen="popUpSeen"
      :popUpMessage="popUpMessage"
      :popUpDuration="4000"
      :where="wherePopUp"
      howFar="0px"
      @closePopUp="popUpSeen = false"
    />
  </div>
</template>

<style lang="scss">
//dialog-content-wrapper на главной странице
.game-over {
  &__content-wrapper {
    display: flex;
    flex-direction: column;
    align-self: center;
  }

  &__header {
    margin-bottom: 8px;
    font-size: 64px;
    font-weight: 700;
    color: rgb(182, 195, 197);
    text-align: center;
  }

  &__statistic {
    display: flex;
    flex-direction: column;
    min-height: 200px;
    max-height: 80vh;
    margin-left: 4px;
    margin-right: 4px;
    padding: 0px 16px 16px 16px;
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
  margin-left: 16px;
  margin-right: 16px;

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
    font-weight: 400;
    text-align: center;
  }
}

.game-over__new-game {
  margin-top: 16px;
  padding: 24px;
  border: none;
  background-color: rgb(221, 231, 231);
}
</style>
