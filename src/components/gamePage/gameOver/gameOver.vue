<script setup>
import { defineAsyncComponent } from 'vue';
import LoadingAuth from '@/components/common/auth/authComp/components/loadingAuth.vue';
import AuthActions from '@/components/common/auth/authActions/authActions.vue';
import AuthState from '@/components/common/auth/authState.vue';
import SaveStatistic from './components/saveStatistic/saveStatistic.vue';
import GameAverage from './components/gameAverage.vue';
import GamePoints from './components/gamePoints.vue';
import GameCheckout from './components/gameCheckout.vue';
import { usePopUp } from './composables/popUp';
import { useSeenAuthComps } from './composables/seenAuthComps.js';
const AuthComp = defineAsyncComponent({
  loader: () => import('@/components/common/auth/authComp/authComp.vue'),
  loadingComponent: LoadingAuth,
  delay: 0
});
const PopUp = defineAsyncComponent({
  loader: () => import('@/components/popUp.vue')
});

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
defineEmits(['startNewGame']);

const { popUpMessage, showPopUp, closePopUp } = usePopUp();
const seenAuthComps = useSeenAuthComps();
</script>

<template>
  <div class="dialog-content-wrapper game-over">
    <AuthComp
      v-if="seenAuthComps.P1.value"
      @closeAuthComp="seenAuthComps.close('P1')"
      player="P1"
    />
    <AuthComp
      v-if="seenAuthComps.P2.value"
      @closeAuthComp="seenAuthComps.close('P2')"
      player="P2"
    />
    <div
      class="game-over__content-wrapper"
      v-show="!seenAuthComps.P1.value && !seenAuthComps.P2.value"
    >
      <h2 class="game-over__header">Матч окончен</h2>
      <div class="game-over__statistic-wrapper">
        <!--нужен для корректной работы transform translate - элемент скрывается из-за overflow-->
        <AuthState
          class="game-over__auth-state_top-left"
          player="P1"
          backgroundColor="rgb(182, 195, 197)"
        />
        <AuthState
          class="game-over__auth-state_top-right"
          player="P2"
          backgroundColor="rgb(182, 195, 197)"
        />
        <SaveStatistic
          player="P1"
          :gameStatistic="props.gameStatisticP1"
          :isPercentDoubleInStat="props.isPercentDoubleInStatP1"
          :legNumber="props.legNumber"
          :legsWonInGame="legsWonInGameP1"
          @showPopUp="(message) => showPopUp(message, 'P1')"
        />
        <SaveStatistic
          player="P2"
          :gameStatistic="props.gameStatisticP2"
          :isPercentDoubleInStat="props.isPercentDoubleInStatP2"
          :legNumber="props.legNumber"
          :legsWonInGame="legsWonInGameP2"
          @showPopUp="(message) => showPopUp(message, 'P2')"
        />
        <div class="game-over__statistic game-statistic">
          <div class="auth-actions-wrapper">
            <AuthActions player="P1" @openAuthComp="seenAuthComps.show('P1')" />
            <AuthActions player="P2" @openAuthComp="seenAuthComps.show('P2')" />
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
      :popUpSeen="Boolean(popUpMessage.P1.value)"
      :popUpMessage="popUpMessage.P1.value"
      :popUpDuration="4000"
      where="left"
      howFar="0px"
      @closePopUp="closePopUp('P1')"
    />
    <PopUp
      :popUpSeen="Boolean(popUpMessage.P2.value)"
      :popUpMessage="popUpMessage.P2.value"
      :popUpDuration="4000"
      where="right"
      howFar="0px"
      @closePopUp="closePopUp('P2')"
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
    margin-bottom: calc(var(--base) * 0.08);
    font-size: calc(var(--base) * 0.64);
    font-weight: 700;
    color: rgb(182, 195, 197);
    text-align: center;
  }

  &__statistic {
    display: flex;
    flex-direction: column;
    min-height: calc(var(--base) * 2);
    max-height: 80vh;
    margin-left: calc(var(--base) * 0.04);
    margin-right: calc(var(--base) * 0.04);
    padding: 0px calc(var(--base) * 0.16) calc(var(--base) * 0.16)
      calc(var(--base) * 0.16);
    border-radius: calc(var(--base) * 0.16);
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
  margin-left: calc(var(--base) * 0.16);
  margin-right: calc(var(--base) * 0.16);

  &__name {
    width: calc(var(--base) * 2.8);
    font-size: calc(var(--base) * 0.32);
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__name_margin-right {
    margin-right: calc(var(--base) * 0.48);
  }
}

.game-result {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-left: calc(var(--base) * 0.16);
  margin-right: calc(var(--base) * 0.16);

  &__player-score {
    width: calc(var(--base) * 2.8);
    font-size: calc(var(--base) * 0.48);
    text-align: center;
  }

  &__player-score_margin-right {
    margin-right: calc(var(--base) * 0.48);
  }
}

.game-statistic {
  &__header-group {
    margin-top: calc(var(--base) * 0.16);
    text-align: center;
    font-size: calc(var(--base) * 0.32);
    font-weight: 700;
    color: white;
  }

  &__parameters {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: calc(var(--base) * 0.08);
  }
}

.statistic-parameters {
  &__values {
    align-self: center;
    width: 33%;
    font-size: calc(var(--base) * 0.24);
    text-align: center;
  }

  &__header {
    align-self: center;
    width: 33%;
    margin-left: calc(var(--base) * 0.16);
    margin-right: calc(var(--base) * 0.16);
    font-size: calc(var(--base) * 0.24);
    font-weight: 400;
    text-align: center;
  }
}

.game-over__new-game {
  margin-top: calc(var(--base) * 0.16);
  margin-bottom: calc(var(--base) * 0.04);
  padding: calc(var(--base) * 0.24);
  border: none;
  background-color: rgb(221, 231, 231);
}

@media (max-width: 750px) {
  .game-over__header {
    margin-top: calc(var(--base) * 0.64);
  }

  .game-over__auth-state_top-left {
    top: calc(var(--base) * -0.32);
    left: calc(var(--base) * 0.34);
  }

  .game-over__auth-state_top-right {
    top: calc(var(--base) * -0.32);
    right: calc(var(--base) * 0.34);
  }

  .game-over__statistic-wrapper {
    margin-top: calc(var(--base) * 0.24);
  }

  .game-over__new-game {
    margin-top: calc(var(--base) * 0.48);
  }

  .game-statistic-player-names {
    &__name {
      width: calc(var(--base) * 1.4);
      font-size: calc(var(--base) * 0.24);
      overflow: hidden;
    }

    &__name_margin-right {
      margin-right: calc(var(--base) * 0.24);
    }
  }
  .game-result {
    &__player-score {
      width: calc(var(--base) * 1.4);
    }
  }
}

@media (max-width: 430px) {
  .game-statistic-player-names {
    &__name {
      width: calc(var(--base) * 1);
      font-size: calc(var(--base) * 0.2);
      overflow: hidden;
    }

    &__name_margin-right {
      margin-right: calc(var(--base) * 0.16);
    }
  }
  .game-result {
    &__player-score {
      width: calc(var(--base) * 1);
    }
  }
}

@media (max-height: 740px) {
  .game-over {
    padding-top: calc(var(--base) * 0.64);
  }
}

@media (max-height: 420px) {
  .game-over {
    padding-top: calc(var(--base) * 1.28);
  }
}

@media (max-height: 420px) {
  .game-over {
    padding-top: calc(var(--base) * 1.92);
  }
}
</style>
