<script setup>
import { ref } from 'vue';
const emit = defineEmits(['startGame']);
const nameOne = ref('Игрок 1');
const nameTwo = ref('Игрок 2');
const startRemainder = ref(501);
const whoStarted = ref('nameOne');
const legs = ref(1);
const sets = ref(1);
const handleInput = (what, event) => {
  if (event.data < '0' || event.data > '9') {
    if (what === 'Legs') legs.value = 0;
    if (what === 'Sets') sets.value = 0;
  }
};
const handleBlur = (what) => {
  switch (what) {
    case 'Игрок 1':
      if (!nameOne.value) nameOne.value = what;
      break;
    case 'Игрок 2':
      if (!nameTwo.value) nameTwo.value = what;
      break;
    case 'Legs':
      if (!legs.value) legs.value = 1;
      break;
    case 'Sets':
      if (!sets.value) sets.value = 1;
      break;
  }
};
const handleClick = () => {
  const gameParameters = {
    nameOne: nameOne.value,
    nameTwo: nameTwo.value,
    startRemainder: startRemainder.value,
    whoStarted: whoStarted.value,
    legs: legs.value,
    sets: sets.value
  };
  emit('startGame', gameParameters);
};
</script>

<template>
  <div class="dialog-content-wrapper">
    <div class="game-setup">
      <h1 class="game-setup__header">Настройка параметров матча</h1>
      <h3 class="game-setup__parameter-header">Формат матча</h3>
      <select
        v-model="startRemainder"
        class="game-setup__start-remainder start-remainder"
      >
        <option class="start-remainder__value" :value="501">501</option>
        <option class="start-remainder__value" :value="1001">1001</option>
      </select>
      <h3 class="game-setup__parameter-header">Имена игроков</h3>
      <div class="game-setup__player-names player-names">
        <input
          class="player-names__name player-names__name_margin-right"
          type="text"
          v-model="nameOne"
          maxlength="30"
          required
          @blur="handleBlur('Игрок 1')"
        />
        <input
          class="player-names__name"
          type="text"
          v-model="nameTwo"
          maxlength="30"
          required
          @blur="handleBlur('Игрок 2')"
        />
      </div>
      <div class="game-setup__who-starts who-starts">
        <input
          class="who-starts__radio-button"
          type="radio"
          name="whoStarts"
          value="nameOne"
          v-model="whoStarted"
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
          value="nameTwo"
          v-model="whoStarted"
        />
      </div>
      <h3 class="game-setup__parameter-header">Необходимо для победы</h3>
      <div class="game-setup__sets-legs sets-legs">
        <label class="sets-legs__parameter">
          Сетов
          <input
            class="sets-legs__value sets-legs__value_margin_right"
            type="number"
            min="1"
            v-model="sets"
            @input="handleInput('Sets', $event)"
            @blur="handleBlur('Sets')"
          />
        </label>
        <label class="sets-legs__parameter">
          Легов
          <input
            class="sets-legs__value"
            type="number"
            min="1"
            v-model="legs"
            @input="handleInput('Legs', $event)"
            @blur="handleBlur('Legs')"
          />
        </label>
      </div>
      <button
        class="game-setup__start-game-button"
        @click.prevent="handleClick"
      >
        Начать матч
      </button>
    </div>
  </div>
</template>

<style lang="scss">
//dialog-content-wrapper на главной странице
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
    width: 180px;
    padding: 4px;
    outline: none;
    border: none;
    border-radius: 4px;
    font: inherit;
    text-align: center;
    background-color: rgb(221, 231, 231);
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

  &__sets-legs {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  &__start-game-button {
    align-self: center;
    width: 450px;
    padding: 8px;
    margin-top: 64px;
    outline: none;
    border: none;
    border-radius: 8px;
    font: inherit;
    background-color: rgb(221, 231, 231);
    transition: all 0.5s linear;
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

.start-remainder__value {
  font: inherit;
  text-align: center;
  background-color: rgb(221, 231, 231);
}

.player-names__name {
  width: 250px;
  padding: 8px;
  outline: none;
  border: none;
  border-radius: 4px;
  font: inherit;
  background-color: rgb(221, 231, 231);
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
  border: 1px solid black;
  border-radius: 50%;
  background-color: rgb(221, 231, 231);
  transition: all 0.3s linear;
}

.who-starts__radio-button:checked {
  background-color: rgb(66, 63, 63);
}

.sets-legs__value {
  width: 100px;
  padding: 8px;
  outline: none;
  border: none;
  border-radius: 4px;
  font: inherit;
  text-align: center;
  background-color: rgb(221, 231, 231);
}

.sets-legs__value_margin_right {
  margin-right: 128px;
}
</style>
