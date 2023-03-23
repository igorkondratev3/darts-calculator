<script setup>
defineEmits(['startNewGame']);
const props = defineProps({
  nameP2: String,
  nameP1: String,
  wonP1: Number,
  wonP2: Number,
  averagePointsGameP2: Number,
  averagePointsWinLegsGameP2: Number,
  averagePointsLoseLegsGameP2: Number,
  averageFirstNineDartsGameP2: Number,
  p180GameP2: Number,
  p171GameP2: Number,
  p131GameP2: Number,
  p96GameP2: Number,
  percentDoubleGameP2: Number,
  highestCheckoutGameP2: Number,
  averagePointsGameP1: Number,
  averagePointsWinLegsGameP1: Number,
  averagePointsLoseLegsGameP1: Number,
  averageFirstNineDartsGameP1: Number,
  p180GameP1: Number,
  p171GameP1: Number,
  p131GameP1: Number,
  p96GameP1: Number,
  percentDoubleGameP1: Number,
  highestCheckoutGameP1: Number
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
          {{ props.averagePointsGameP1.toFixed(2) }}
        </div>
        <div class="statistic-parameters__header">матч</div>
        <div class="statistic-parameters__values">
          {{ props.averagePointsGameP2.toFixed(2) }}
        </div>
      </div>
      <div class="game-statistic__parameters statistic-parameters">
        <div class="statistic-parameters__values">
          {{ props.averagePointsWinLegsGameP1.toFixed(2) }}
        </div>
        <div class="statistic-parameters__header">выигранные леги</div>
        <div class="statistic-parameters__values">
          {{ props.averagePointsWinLegsGameP2.toFixed(2) }}
        </div>
      </div>
      <div class="game-statistic__parameters statistic-parameters">
        <div class="statistic-parameters__values">
          {{ props.averagePointsLoseLegsGameP1.toFixed(2) }}
        </div>
        <div class="statistic-parameters__header">проигранные леги</div>
        <div class="statistic-parameters__values">
          {{ props.averagePointsLoseLegsGameP2.toFixed(2) }}
        </div>
      </div>
      <div class="game-statistic__parameters statistic-parameters">
        <div class="statistic-parameters__values">
          {{ props.averageFirstNineDartsGameP1.toFixed(2) }}
        </div>
        <div class="statistic-parameters__header">9 дротиков</div>
        <div class="statistic-parameters__values">
          {{ props.averageFirstNineDartsGameP2.toFixed(2) }}
        </div>
      </div>
      <div class="game-statistic__header-group">Очки</div>
      <div class="game-statistic__parameters statistic-parameters">
        <div class="statistic-parameters__values">{{ props.p180GameP1 }}</div>
        <div class="statistic-parameters__header">180</div>
        <div class="statistic-parameters__values">{{ props.p180GameP2 }}</div>
      </div>
      <div class="game-statistic__parameters statistic-parameters">
        <div class="statistic-parameters__values">{{ props.p171GameP1 }}</div>
        <div class="statistic-parameters__header">171+</div>
        <div class="statistic-parameters__values">{{ props.p171GameP2 }}</div>
      </div>
      <div class="game-statistic__parameters statistic-parameters">
        <div class="statistic-parameters__values">{{ props.p131GameP1 }}</div>
        <div class="statistic-parameters__header">131+</div>
        <div class="statistic-parameters__values">{{ props.p131GameP2 }}</div>
      </div>
      <div class="game-statistic__parameters statistic-parameters">
        <div class="statistic-parameters__values">{{ props.p96GameP1 }}</div>
        <div class="statistic-parameters__header">96+</div>
        <div class="statistic-parameters__values">{{ props.p96GameP2 }}</div>
      </div>
      <div class="game-statistic__header-group">Закрытия</div>
      <div class="game-statistic__parameters statistic-parameters">
        <div class="statistic-parameters__values">
          {{ props.percentDoubleGameP1.toFixed(2) }} %
        </div>
        <div class="statistic-parameters__header">%</div>
        <div class="statistic-parameters__values">
          {{ props.percentDoubleGameP2.toFixed(2) }} %
        </div>
      </div>
      <div class="game-statistic__parameters statistic-parameters">
        <div class="statistic-parameters__values">
          {{ props.highestCheckoutGameP1 }}
        </div>
        <div class="statistic-parameters__header">наибольшее</div>
        <div class="statistic-parameters__values">
          {{ props.highestCheckoutGameP2 }}
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
    font-size: 48px;
    text-align: center;
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
  font:inherit;
  background-color: rgb(221, 231, 231);
  transition: all 0.5s linear;

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
