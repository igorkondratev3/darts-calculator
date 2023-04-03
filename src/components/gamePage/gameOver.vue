<script setup>
defineEmits(['startNewGame']);
const props = defineProps({
  nameP2: String,
  nameP1: String,
  wonP1: Number,
  wonP2: Number,
  gameStatisticP1: Object,
  gameStatisticP2: Object,
  isPercentDoubleP1: Boolean,
  isPercentDoubleP2: Boolean
});
</script>

<template>
  <div class="dialog-content-wrapper game-over">
    <h2 class="game-over__message">Матч окончен</h2>
    <div class="game-over__statistic game-statistic">
      <div class="game-statistic__player-names game-statistic-player-names">
        <div
          class="game-statistic-player-names__name game-statistic-player-names__name_margin-right"
        >
          {{ props.nameP1 }}
        </div>
        <div class="game-statistic-player-names__name">{{ props.nameP2 }}</div>
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
        v-if="props.isPercentDoubleP1 || props.isPercentDoubleP2"
      >
        <div class="statistic-parameters__values">
         <span v-if="props.isPercentDoubleP1"> {{ props.gameStatisticP1.percentDouble.value.toFixed(2) }} % </span>
        </div>
        <div class="statistic-parameters__header">%</div>
        <div class="statistic-parameters__values">
          <span v-if="props.isPercentDoubleP2"> {{ props.gameStatisticP2.percentDouble.value.toFixed(2) }} % </span>
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
    <button class="game-over__new-game-button" @click="$emit('startNewGame')">
      Новый матч
    </button>
  </div>
</template>

<style lang="scss">
//dialog-content-wrapper на главной странице
.game-over {
  &__message {
    font-size: 64px;
    font-weight: 700;
    color: rgb(182, 195, 197);
  }

  &__statistic {
    display: flex;
    flex-direction: column;
    min-height: 200px;
    max-height: 80vh;
    margin-top: 8px;
    padding: 16px;
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
  outline: none;
  border: none;
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
</style>
