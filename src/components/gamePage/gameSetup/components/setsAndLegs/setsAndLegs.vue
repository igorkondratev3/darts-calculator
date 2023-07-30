<script setup>
import { changeValuesToWin, changeAreSetsInGame } from './helpers.js';

defineProps({
  setsToWin: Number,
  areSetsInGame: Boolean,
  legsToWin: Number
});
defineEmits(['update:setsToWin', 'update:areSetsInGame', 'update:legsToWin']);
</script>

<template>
  <h3 class="game-setup__parameter-header">Необходимо для победы</h3>
  <div class="game-setup__sets-legs sets-legs">
    <label
      class="sets-legs__parameter sets-legs__value_margin-right sets-legs__value_margin-left"
    >
      Сетов
      <input
        class="sets-legs__value"
        type="number"
        min="1"
        :value="setsToWin"
        @input="changeValuesToWin('setsToWin', $event, $emit)"
        @blur="!setsToWin ? $emit('update:setsToWin', 1) : undefined"
        :disabled="!areSetsInGame"
      />
      <input
        class="sets-legs__is-disabled"
        type="checkbox"
        :checked="areSetsInGame"
        @change="changeAreSetsInGame($event, areSetsInGame, $emit)"
        @keyup.enter="changeAreSetsInGame($event, areSetsInGame, $emit)"
      />
    </label>
    <label class="sets-legs__parameter">
      Легов
      <input
        class="sets-legs__value"
        type="number"
        min="1"
        :value="legsToWin"
        @input="changeValuesToWin('legsToWin', $event, $emit)"
        @blur="!legsToWin ? $emit('update:legsToWin', 1) : undefined"
      />
    </label>
  </div>
</template>

<style lang="scss">
.sets-legs {
  display: flex;
  flex-direction: row;
  justify-content: center;

  &__value {
    width: var(--base);
    padding: calc(var(--base) * 0.08);
    outline: none;
    border: calc(var(--base) * 0.01) solid transparent;
    border-radius: calc(var(--base) * 0.04);
    font: inherit;
    text-align: center;
    background-color: rgb(221, 231, 231);

    &:focus-visible {
      outline: calc(var(--base) * 0.01) solid black;
    }

    &:disabled {
      opacity: 50%;
    }

    &_margin-right {
      margin-right: calc(var(--base) * 1.28);
    }
  }

  &__is-disabled {
    margin-left: calc(var(--base) * 0.08);
  }
}

@media (max-width: 580px) {
  .sets-legs {
    flex-direction: column;
    align-self: center;

    &__parameter {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: calc(var(--base) * 0.16);
    }

    &__value {
      margin-top: calc(var(--base) * 0.08);
      &_margin-right {
        margin-right: 0px;
      }
      &_margin-left {
        margin-left: calc(var(--base) * 0.02);
      }
    }

    &__is-disabled {
      margin-left: 0;
      margin-top: calc(var(--base) * 0.08);
    }
  }
}
</style>
