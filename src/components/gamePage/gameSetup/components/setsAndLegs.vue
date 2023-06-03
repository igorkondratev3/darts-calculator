<script setup>
const props = defineProps({
  setsToWin: Number,
  areSetsInGame: Boolean,
  legsToWin: Number
});
const emits = defineEmits([
  'update:setsToWin',
  'update:areSetsInGame',
  'update:legsToWin'
]);

const checkValuesToWin = (parameterName, event) => {
  let newValue = Number(event.currentTarget.value);
  if (event.data < '0' || event.data > '9') newValue = 1;
  emits(`update:${parameterName}`, newValue);
};

const checkParameterForEmpty = (parameterName, altParameterValue) => {
  if (!props[parameterName])
    emits(`update:${parameterName}`, altParameterValue);
};

const changeAreSetsInGame = (event) => {
  if (event.type === 'change')
    emits('update:areSetsInGame', event.currentTarget.checked);
  else emits('update:areSetsInGame', !event.currentTarget.checked);
  checkAreSetsInGame(event.currentTarget.previousElementSibling);
};

const checkAreSetsInGame = (setInput) => {
  //так как emit отработает после выполнения функции значения поменяны на обратные
  //можно передавать в функцию сразу актуальный параметр - подумать
  if (props.areSetsInGame) emits('update:setsToWin', 1);
  if (!props.areSetsInGame) setTimeout(() => setInput.focus(), 0);
};
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
        @input="checkValuesToWin('setsToWin', $event)"
        @blur="checkParameterForEmpty('setsToWin', 1)"
        :disabled="!areSetsInGame"
      />
      <input
        class="sets-legs__is-disabled"
        type="checkbox"
        :checked="areSetsInGame"
        @change="changeAreSetsInGame"
        @keyup.enter="changeAreSetsInGame"
      />
    </label>
    <label class="sets-legs__parameter">
      Легов
      <input
        class="sets-legs__value"
        type="number"
        min="1"
        :value="legsToWin"
        @input="checkValuesToWin('legsToWin', $event)"
        @blur="checkParameterForEmpty('legsToWin', 1)"
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

    &:focus {
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
