<script setup>
import { useUsersStore } from '@/stores/users.js';

const props = defineProps({
  nameP1: String,
  nameP2: String
});
const emits = defineEmits(['update:nameP1', 'update:nameP2']);

const usersStore = useUsersStore();

const checkParameterForEmpty = (parameterName, altParameterValue) => {
  if (!props[parameterName])
    emits(`update:${parameterName}`, altParameterValue);
};
</script>

<template>
  <h3 class="game-setup__parameter-header">Имена игроков</h3>
  <div class="game-setup__player-names player-names">
    <input
      class="player-names__name player-names__name_margin-right"
      type="text"
      :value="nameP1 || usersStore.users.P1?.name"
      :disabled="usersStore.users.P1"
      @input="$emit('update:nameP1', $event.currentTarget.value)"
      maxlength="30"
      required
      @blur="checkParameterForEmpty('nameP1', 'Игрок 1')"
    />
    <input
      class="player-names__name"
      type="text"
      :value="usersStore.users.P2?.name || nameP2"
      :disabled="usersStore.users.P2"
      @input="$emit('update:nameP2', $event.currentTarget.value)"
      maxlength="30"
      required
      @blur="checkParameterForEmpty('nameP2', 'Игрок 2')"
    />
  </div>
</template>

<style lang="scss">
@use '@/assets/css/mixins/fonts.scss';

.player-names {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: calc(var(--base) * 0.16);
  margin-right: calc(var(--base) * 0.16);

  &__name {
    width: calc(var(--base) * 2.5);
    padding: calc(var(--base) * 0.08);
    outline: none;
    border: calc(var(--base) * 0.01) solid transparent;
    border-radius: calc(var(--base) * 0.04);
    @include fonts.Advent;
    background-color: rgb(221, 231, 231);

    &:focus {
      outline: calc(var(--base) * 0.01) solid black;
    }

    &:disabled {
      opacity: 50%;
    }

    &_margin-right {
      margin-right: calc(var(--base) * 1.4);
    }
  }
}
</style>
