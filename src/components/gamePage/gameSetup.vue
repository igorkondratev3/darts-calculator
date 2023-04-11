<script setup>
import { ref } from 'vue';

const props = defineProps({
  seenSetup: Boolean
});
const emit = defineEmits(['startGame']);

const gamePararmeters = {
  nameP1: ref('Игрок 1'),
  nameP2: ref('Игрок 2'),
  startRemainder: ref(501),
  whoStarts: ref('nameP1'),
  legsToWin: ref(1),
  setsToWin: ref(1),
  areSetsInGame: ref(false),
  isPercentDoubleInStatP1: ref(false),
  isPercentDoubleInStatP2: ref(false)
};

const checkValuesToWin = (valuesName, event) => {
  if (event.data < '0' || event.data > '9')
    gamePararmeters[valuesName].value = 0;
};

const checkParameterForEmpty = (parameterName, altParameterValue) => {
  if (!gamePararmeters[parameterName].value)
    gamePararmeters[parameterName].value = altParameterValue;
};

const startGame = (gameParameters) => {
  const gamePararmetersForNewGame = {};
  for (const parameterName in gameParameters)
    gamePararmetersForNewGame[parameterName] =
      gameParameters[parameterName].value;
  emit('startGame', gamePararmetersForNewGame);
};

const changeAreSetsInGame = (event) => {
  gamePararmeters.areSetsInGame.value = !gamePararmeters.areSetsInGame.value;
  checkAreSetsInGame(event.currentTarget.previousElementSibling);
};

const checkAreSetsInGame = (setInput) => {
  if (!gamePararmeters.areSetsInGame.value) gamePararmeters.setsToWin.value = 1;
  if (gamePararmeters.areSetsInGame.value)
    setTimeout(() => setInput.focus(), 0);
};

const seenSelectRemainders = ref(false);
const setStartRemainder = (remainder) => {
  gamePararmeters.startRemainder.value = remainder;
  seenSelectRemainders.value = false;
};
</script>

<template>
  <div
    class="dialog-content-wrapper"
    v-show="props.seenSetup"
    @click="seenSelectRemainders = false"
  >
    <div class="game-setup">
      <h1 class="game-setup__header">Настройка параметров матча</h1>
      <h3 class="game-setup__parameter-header">Формат матча</h3>
      <div class="game-setup__start-remainder">
        <div
          class="start-remainder__header"
          tabindex="0"
          @click.stop="seenSelectRemainders = true"
          @keyup.enter="seenSelectRemainders = true"
        >
          {{ gamePararmeters.startRemainder.value }}
          <img
            class="arrow-down-icon"
            src="/src/assets/images/arrow_down.svg"
            alt="open"
          />
        </div>
        <div
          class="start-remainder__values"
          v-show="seenSelectRemainders"
          @click.stop=""
        >
          <div
            class="start-remainder__value"
            tabindex="0"
            @click="setStartRemainder(501)"
            @keyup.enter="setStartRemainder(501)"
          >
            501
          </div>
          <div
            class="start-remainder__value"
            tabindex="0"
            @click="setStartRemainder(1001)"
            @keyup.enter="setStartRemainder(1001)"
          >
            1001
          </div>
        </div>
      </div>
      <h3 class="game-setup__parameter-header">Имена игроков</h3>
      <div class="game-setup__player-names player-names">
        <input
          class="player-names__name player-names__name_margin-right"
          type="text"
          v-model="gamePararmeters.nameP1.value"
          maxlength="30"
          required
          @blur="checkParameterForEmpty('nameP1', 'Игрок 1')"
        />
        <input
          class="player-names__name"
          type="text"
          v-model="gamePararmeters.nameP2.value"
          maxlength="30"
          required
          @blur="checkParameterForEmpty('nameP2', 'Игрок 2')"
        />
      </div>
      <div class="game-setup__who-starts who-starts">
        <input
          class="who-starts__radio-button"
          type="radio"
          name="whoStarts"
          value="nameP1"
          v-model="gamePararmeters.whoStarts.value"
        />
        <h3
          class="game-setup__parameter-header game-setup__parameter-header_margin_zero"
        >
          Кто начинает
        </h3>
        <input
          class="who-starts__radio-button"
          type="radio"
          name="whoStarts"
          value="nameP2"
          v-model="gamePararmeters.whoStarts.value"
        />
      </div>
      <div class="game-setup__is-percent-double is-percent-double">
        <input
          class="is-percent-double__value"
          type="checkbox"
          v-model="gamePararmeters.isPercentDoubleInStatP1.value"
          @keyup.enter="
            gamePararmeters.isPercentDoubleInStatP1.value =
              !gamePararmeters.isPercentDoubleInStatP1.value
          "
        />
        <h3
          class="game-setup__parameter-header game-setup__parameter-header_margin_zero"
        >
          Подсчитывать процент удвоений
        </h3>
        <input
          class="is-percent-double__value"
          type="checkbox"
          v-model="gamePararmeters.isPercentDoubleInStatP2.value"
          @keyup.enter="
            gamePararmeters.isPercentDoubleInStatP2.value =
              !gamePararmeters.isPercentDoubleInStatP2.value
          "
        />
      </div>
      <h3 class="game-setup__parameter-header">Необходимо для победы</h3>
      <div class="game-setup__sets-legs sets-legs">
        <label class="sets-legs__parameter sets-legs__value_margin_right">
          Сетов
          <input
            class="sets-legs__value"
            type="number"
            min="1"
            v-model="gamePararmeters.setsToWin.value"
            @input="checkValuesToWin('setsToWin', $event)"
            @blur="checkParameterForEmpty('setsToWin', 1)"
            :disabled="!gamePararmeters.areSetsInGame.value"
          />
          <input
            class="sets-legs__is-disabled"
            type="checkbox"
            v-model="gamePararmeters.areSetsInGame.value"
            @change="
              checkAreSetsInGame($event.currentTarget.previousElementSibling)
            "
            @keyup.enter="changeAreSetsInGame"
          />
        </label>
        <label class="sets-legs__parameter">
          Легов
          <input
            class="sets-legs__value"
            type="number"
            min="1"
            v-model="gamePararmeters.legsToWin.value"
            @input="checkValuesToWin('legsToWin', $event)"
            @blur="checkParameterForEmpty('legsToWin', 1)"
          />
        </label>
      </div>
      <button
        class="game-setup__start-game-button"
        @click.prevent="startGame(gamePararmeters)"
      >
        Начать матч
      </button>
    </div>
  </div>
</template>

<style lang="scss">
//dialog-content-wrapper на главной странице
@use '@/assets/css/mixins/fonts.scss';

.game-setup {
  display: flex;
  flex-direction: column;
  max-height: 95vh;
  max-width: 95vw;
  padding: 16px;
  border-radius: 16px;
  overflow: scroll;
  background-color: rgb(177, 205, 223);

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

  &__header {
    font-size: 32px;
    font-weight: 700;
    text-align: center;
  }

  &__parameter-header {
    margin-top: 32px;
    margin-bottom: 16px;
    font-weight: 700;
    text-align: center;
  }

  &__start-remainder {
    align-self: center;
  }

  &__player-names {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__who-starts {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 16px;
  }

  &__is-percent-double {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 32px;
  }

  &__sets-legs {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  &__start-game-button {
    align-self: center;
    width: 450px;
    margin-top: 64px;
    padding: 8px;
    border-radius: 8px;
    @include fonts.Advent;
    background-color: rgb(221, 231, 231);
    transition: background-color 0.5s linear, color 0.5s linear;
  }

  &__start-game-button:hover {
    background-color: black;
    color: white;
  }

  &__start-game-button:focus {
    background-color: black;
    color: white;
  }
}

.start-remainder {
  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
    padding: 8px;
    padding-right: 16px;
    outline: none;
    border: 1px solid transparent;
    border-radius: 4px;
    font: inherit;
    text-align: center;
    cursor: default;
    background-color: rgb(221, 231, 231);

    &:focus {
      border: 1px solid black;
    }
  }

  &__values {
    position: absolute;
    z-index: 2;
    border-radius: 4px;
    background-color: rgb(208, 216, 216);
  }

  &__value {
    width: 180px;
    margin-top: 4px;
    margin-bottom: 4px;
    padding: 8px;
    outline: none;
    border: 1px solid transparent;
    border-radius: 4px;
    font: inherit;
    text-align: center;
    cursor: default;
    background-color: rgb(221, 231, 231);

    &:hover,
    &:focus {
      background-color: rgb(146, 188, 214);
    }
  }
}

.arrow-down-icon {
  position: absolute;
  right: 0;
  width: 24px;
  height: 24px;
}

.player-names__name {
  width: 250px;
  padding: 8px;
  outline: none;
  border: 1px solid transparent;
  border-radius: 4px;
  @include fonts.Advent;
  background-color: rgb(221, 231, 231);

  &:focus {
    border: 1px solid black;
  }
}

.player-names__name_margin-right {
  margin-right: 140px;
}

.game-setup__parameter-header_margin_zero {
  margin: 0 16px;
}

.who-starts__radio-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  outline: none;
  border: 1px solid white;
  border-radius: 50%;
  background-color: rgb(221, 231, 231);
  transition: background-color 0.3s linear, border 0.3s linear;

  &:checked {
    background-color: rgb(66, 63, 63);
    border: 1px solid rgb(66, 63, 63);
  }

  &:focus {
    border: 1px solid white;
  }
}

.sets-legs__value {
  width: 100px;
  padding: 8px;
  outline: none;
  border: 1px solid transparent;
  border-radius: 4px;
  font: inherit;
  text-align: center;
  background-color: rgb(221, 231, 231);

  &:focus {
    border: 1px solid black;
  }

  &:disabled {
    opacity: 50%;
  }
}

.sets-legs__value_margin_right {
  margin-right: 128px;
}

.sets-legs__is-disabled {
  margin-left: 8px;
}
</style>
