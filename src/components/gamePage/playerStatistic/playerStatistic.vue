<script setup>
import { ref, computed } from 'vue';
const props = defineProps({
  averagePointsGame: Number,
  averagePointsSet: Number,
  averagePointsLeg: Number,
  percentDoubleGame: Number,
  percentDoubleSet: Number,
  p180Set: Number,
  p171Set: Number,
  p131Set: Number,
  p96Set: Number,
  p180Game: Number,
  p171Game: Number,
  p131Game: Number,
  p96Game: Number,
  averageFirstNineDartsGame: Number,
  averageFirstNineDartsSet: Number,
  averagePointsWinLegsGame: Number,
  averagePointsWinLegsSet: Number,
  averagePointsLoseLegsGame: Number,
  averagePointsLoseLegsSet: Number,
  highestCheckoutGame: Number,
  highestCheckoutSet: Number
});

const seenSetupVisisbility = ref(false);
const seenAveragePointsGame = ref(true);
const seenAveragePointsSet = ref(true);
const seenAveragePointsLeg = ref(true);
const seenAverageFirstNineDartsGame = ref(true);
const seenAverageFirstNineDartsSet = ref(true);
const seenAveragePointsWinLegsGame = ref(true);
const seenAveragePointsWinLegsSet = ref(true);
const seenAveragePointsLoseLegsGame = ref(true);
const seenAveragePointsLoseLegsSet = ref(true);
const seenP180Game = ref(true);
const seenP171Game = ref(true);
const seenP131Game = ref(true);
const seenP96Game = ref(true);
const seenP180Set = ref(true);
const seenP171Set = ref(true);
const seenP131Set = ref(true);
const seenP96Set = ref(true);
const seenPercentDoubleGame = ref(true);
const seenPercentDoubleSet = ref(true);
const seenHighestCheckoutGame = ref(true);
const seenHighestCheckoutSet = ref(true);

const seenAverageFirstNineDarts = computed(
  () =>
    seenAverageFirstNineDartsGame.value || seenAverageFirstNineDartsSet.value
);

const seenAveragePointsWinLegs = computed(
  () => seenAveragePointsWinLegsGame.value || seenAveragePointsWinLegsSet.value
);

const seenAveragePointsLoseLegs = computed(
  () =>
    seenAveragePointsLoseLegsGame.value || seenAveragePointsLoseLegsSet.value
);
const seenAveragePoints = computed(
  () =>
    seenAveragePointsGame.value ||
    seenAveragePointsSet.value ||
    seenAveragePointsLeg.value ||
    seenAverageFirstNineDarts.value ||
    seenAveragePointsWinLegs.value ||
    seenAveragePointsLoseLegs.value
);

const seenPointsGame = computed(
  () =>
    seenP180Game.value ||
    seenP171Game.value ||
    seenP131Game.value ||
    seenP96Game.value
);

const seenPointsSet = computed(
  () =>
    seenP180Set.value ||
    seenP171Set.value ||
    seenP131Set.value ||
    seenP96Set.value
);

const seenPoints = computed(() => seenPointsSet.value || seenPointsGame.value);

const seenDouble = computed(
  () => seenPercentDoubleGame.value || seenPercentDoubleSet.value
);

const seenHighest = computed(
  () => seenHighestCheckoutGame.value || seenHighestCheckoutSet.value
);

const seenClosing = computed(() => seenDouble.value || seenHighest.value);
</script>

<template>
  <div class="points-information__statistic statistic">
    <div class="statistic__player-statistic" v-show="!seenSetupVisisbility">
      <img
        class="statistic__setup-visibility"
        src="/src/assets/images/menu.svg"
        @click="seenSetupVisisbility = true"
        title="Настроить видимость параметров"
      />
      <div
        class="statistic__average statistic-average"
        v-if="seenAveragePoints"
      >
        <h4
          class="statistic__group-header statistic__group-header_margin-bottom"
        >
          Средний набор
        </h4>
        <div class="statistic-average__points">
          <div class="statistic__values" v-if="seenAveragePointsGame">
            матч<br />{{ props.averagePointsGame.toFixed(2) }}
          </div>
          <div class="statistic__values" v-if="seenAveragePointsSet">
            сет<br />{{ props.averagePointsSet.toFixed(2) }}
          </div>
          <div class="statistic__values" v-if="seenAveragePointsLeg">
            лег<br />{{ props.averagePointsLeg.toFixed(2) }}
          </div>
        </div>
        <div
          class="statistic-average__nine-darts"
          v-if="seenAverageFirstNineDarts"
        >
          <h5 class="statistic__parameter-header">9 дротиков</h5>
          <div class="statistic__values" v-if="seenAverageFirstNineDartsGame">
            матч<br />
            {{ props.averageFirstNineDartsGame.toFixed(2) }}
          </div>
          <div class="statistic__values" v-if="seenAverageFirstNineDartsSet">
            сет<br />
            {{ props.averageFirstNineDartsSet.toFixed(2) }}
          </div>
        </div>
        <div
          class="statistic-average__win-legs"
          v-if="seenAveragePointsWinLegs"
        >
          <h5 class="statistic__parameter-header">выигранные леги</h5>
          <div class="statistic__values" v-if="seenAveragePointsWinLegsGame">
            матч<br />
            {{ props.averagePointsWinLegsGame.toFixed(2) }}
          </div>
          <div class="statistic__values" v-if="seenAveragePointsWinLegsSet">
            сет<br />
            {{ props.averagePointsWinLegsSet.toFixed(2) }}
          </div>
        </div>
        <div
          class="statistic-average__lose-legs"
          v-if="seenAveragePointsLoseLegs"
        >
          <h5 class="statistic__parameter-header">проигранные леги</h5>
          <div class="statistic__values" v-if="seenAveragePointsLoseLegsGame">
            матч<br />
            {{ props.averagePointsLoseLegsGame.toFixed(2) }}
          </div>
          <div class="statistic__values" v-if="seenAveragePointsLoseLegsSet">
            сет<br />
            {{ props.averagePointsLoseLegsSet.toFixed(2) }}
          </div>
        </div>
      </div>
      <div class="statistic__points statistic-points" v-if="seenPoints">
        <h4 class="statistic__group-header">Очки</h4>
        <div class="statistic-points__game-points" v-if="seenPointsGame">
          <h5
            class="statistic__parameter-header"
          >
            матч
          </h5>
          <div class="statistic__values" v-if="seenP180Game">
            180<br />{{ props.p180Game }}
          </div>
          <div class="statistic__values" v-if="seenP171Game">
            171+<br />{{ props.p171Game }}
          </div>
          <div class="statistic__values" v-if="seenP131Game">
            131+<br />{{ props.p131Game }}
          </div>
          <div class="statistic__values" v-if="seenP96Game">
            96+<br />{{ props.p96Game }}
          </div>
        </div>
        <div class="statistic-points__set-points" v-if="seenPointsSet">
          <h5 class="statistic__parameter-header">сет</h5>
          <div class="statistic__values" v-if="seenP180Set">
            180<br />{{ props.p180Set }}
          </div>
          <div class="statistic__values" v-if="seenP171Set">
            171+<br />{{ props.p171Set }}
          </div>
          <div class="statistic__values" v-if="seenP131Set">
            131+<br />{{ props.p131Set }}
          </div>
          <div class="statistic__values" v-if="seenP96Set">
            96+<br />{{ props.p96Set }}
          </div>
        </div>
      </div>
      <div class="statistic__closing statistic-closing" v-if="seenClosing">
        <h4 class="statistic__group-header">Закрытия</h4>
        <div class="statistic-closing__double" v-if="seenDouble">
          <h5
            class="statistic__parameter-header"
          >
            % удвоений
          </h5>
          <div class="statistic__values" v-if="seenPercentDoubleGame">
            матч<br />
            {{ props.percentDoubleGame.toFixed(2) }} %
          </div>
          <div class="statistic__values" v-if="seenPercentDoubleSet">
            сет<br />
            {{ props.percentDoubleSet.toFixed(2) }} %
          </div>
        </div>
        <div class="statistic-closing__highest" v-if="seenHighest">
          <h5 class="statistic__parameter-header">наибольшее</h5>
          <div class="statistic__values" v-if="seenHighestCheckoutGame">
            матч<br />
            {{ props.highestCheckoutGame }}
          </div>
          <div class="statistic__values" v-if="seenHighestCheckoutSet">
            сет<br />
            {{ props.highestCheckoutSet }}
          </div>
        </div>
      </div>
    </div>

    <div
      class="statistic__player-statistic statistic__visibility"
      v-show="seenSetupVisisbility"
    >
      <img
        class="statistic__setup-visibility"
        src="/src/assets/images/close.svg"
        @click="seenSetupVisisbility = false"
        title="Закрыть настройку видимости параметров"
      />
      <div class="statistic__average statistic-average">
        <h4 class="statistic__group-header statistic__group-header_margin-bottom">
          Средний набор
        </h4>
        <div class="statistic-average__points">
          <label class="statistic__values statistic-values">
            матч<br />
            <input
              type="checkbox"
              class="statistic-values__visibility"
              v-model="seenAveragePointsGame"
            />
          </label>
          <label class="statistic__values">
            сет<br />
            <input
              type="checkbox"
              class="statistic-values__visibility"
              v-model="seenAveragePointsSet"
            />
          </label>
          <label class="statistic__values">
            лег<br />
            <input
              type="checkbox"
              class="statistic-values__visibility"
              v-model="seenAveragePointsLeg"
            />
          </label>
        </div>
        <div class="statistic-average__nine-darts">
          <h5 class="statistic__parameter-header">9 дротиков</h5>
          <label class="statistic__values">
            матч<br />
            <input
              type="checkbox"
              class="statistic-values__visibility"
              v-model="seenAverageFirstNineDartsGame"
            />
          </label>
          <label class="statistic__values">
            сет<br />
            <input
              type="checkbox"
              class="statistic-values__visibility"
              v-model="seenAverageFirstNineDartsSet"
            />
          </label>
        </div>
        <div class="statistic-average__win-legs">
          <h5 class="statistic__parameter-header">выигранные леги</h5>
          <label class="statistic__values">
            матч<br />
            <input
              type="checkbox"
              class="statistic-values__visibility"
              v-model="seenAveragePointsWinLegsGame"
            />
          </label>
          <label class="statistic__values">
            сет<br />
            <input
              type="checkbox"
              class="statistic-values__visibility"
              v-model="seenAveragePointsWinLegsSet"
            />
          </label>
        </div>
        <div class="statistic-average__lose-legs">
          <h5 class="statistic__parameter-header">проигранные леги</h5>
          <label class="statistic__values">
            матч<br />
            <input
              type="checkbox"
              class="statistic-values__visibility"
              v-model="seenAveragePointsLoseLegsGame"
            />
          </label>
          <label class="statistic__values">
            сет<br />
            <input
              type="checkbox"
              class="statistic-values__visibility"
              v-model="seenAveragePointsLoseLegsSet"
            />
          </label>
        </div>
      </div>
      <div class="statistic__points statistic-points">
        <h4 class="statistic__group-header">Очки</h4>
        <div class="statistic-points__game-points">
          <h5
            class="statistic__parameter-header"
          >
            матч
          </h5>
          <label class="statistic__values"
            >180<br />
            <input
              type="checkbox"
              class="statistic-values__visibility"
              v-model="seenP180Game"
            />
          </label>
          <label class="statistic__values"
            >171+<br />
            <input
              type="checkbox"
              class="statistic-values__visibility"
              v-model="seenP171Game"
            />
          </label>
          <label class="statistic__values"
            >131+<br />
            <input
              type="checkbox"
              class="statistic-values__visibility"
              v-model="seenP131Game"
            />
          </label>
          <label class="statistic__values"
            >96+<br />
            <input
              type="checkbox"
              class="statistic-values__visibility"
              v-model="seenP96Game"
            />
          </label>
        </div>
        <div class="statistic-points__set-points">
          <h5 class="statistic__parameter-header">сет</h5>
          <label class="statistic__values"
            >180<br />
            <input
              type="checkbox"
              class="statistic-values__visibility"
              v-model="seenP180Set"
            />
          </label>
          <label class="statistic__values"
            >171+<br />
            <input
              type="checkbox"
              class="statistic-values__visibility"
              v-model="seenP171Set"
            />
          </label>
          <label class="statistic__values"
            >131+<br />
            <input
              type="checkbox"
              class="statistic-values__visibility"
              v-model="seenP131Set"
            />
          </label>
          <label class="statistic__values"
            >96+<br />
            <input
              type="checkbox"
              class="statistic-values__visibility"
              v-model="seenP96Set"
            />
          </label>
        </div>
      </div>
      <div class="statistic__closing statistic-closing">
        <h4 class="statistic__group-header">Закрытия</h4>
        <div class="statistic-closing__double">
          <h5
            class="statistic__parameter-header"
          >
            % удвоений
          </h5>
          <label class="statistic__values">
            матч<br />
            <input
              type="checkbox"
              class="statistic-values__visibility"
              v-model="seenPercentDoubleGame"
            />
          </label>
          <label class="statistic__values">
            сет<br />
            <input
              type="checkbox"
              class="statistic-values__visibility"
              v-model="seenPercentDoubleSet"
            />
          </label>
        </div>
        <div class="statistic-closing__highest">
          <h5 class="statistic__parameter-header">наибольшее</h5>
          <label class="statistic__values">
            матч<br />
            <input
              type="checkbox"
              class="statistic-values__visibility"
              v-model="seenHighestCheckoutGame"
            />
          </label>
          <label class="statistic__values">
            сет<br />
            <input
              type="checkbox"
              class="statistic-values__visibility"
              v-model="seenHighestCheckoutSet"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.points-information {
  &__statistic {
    flex-grow: 1;
    flex-basis: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
}
.statistic {
  &__player-statistic {
    position: sticky;
    top: 8px;
    display: flex;
    flex-direction: column;
    min-height: 200px;
    max-height: 80vh;
    margin-top: 8px;
    margin-left: 4px;
    margin-right: 4px;
    padding: 16px;
    padding-top: 0px;
    border-radius: 16px;
    overflow: auto;
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

  &__setup-visibility {
    position: sticky;
    align-self: flex-end;
    top: 4px;
    margin-right: -12px;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  &__visibility {
    min-height: 80vh;
  }

  &__average,
  &__points,
  &__closing {
    display: flex;
    flex-direction: column;
  }

  &__group-header {
    margin-top: 24px;
    font-size: 28px;
    font-weight: 700;
    color: white;
    text-align: center;
  }

  &__group-header_margin-bottom {
    margin-bottom: 8px;
  }

  &__parameter-header {
    width: 100%;
    margin-top: 16px;
    font-size: 24px;
    color: white;
    text-align: center;
  }

  &__values {
    font-size: 24px;
    text-align: center;
  }
}

.statistic-average__nine-darts,
.statistic-average__points,
.statistic-average__lose-legs,
.statistic-average__win-legs,
.statistic-points__game-points,
.statistic-points__set-points,
.statistic-closing__double,
.statistic-closing__highest {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.statistic-values__visibility {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid black;
  border-radius: 4px;
  background: rgb(232, 238, 233);
  transition: all 0.3s linear;

  &:checked {
    background: rgb(66, 63, 63) url('/src/assets/images/check.svg');
  }
}
</style>
