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
  margin-left: 16px;
  margin-right: 16px;

  &__name {
    width: 250px;
    padding: 8px;
    outline: none;
    border: 1px solid transparent;
    border-radius: 4px;
    @include fonts.Advent;
    background-color: rgb(221, 231, 231);

    &:focus {
      outline: 1px solid black;
    }

    &:disabled {
      opacity: 50%;
    }

    &_margin-right {
      margin-right: 140px;
    }
  }
}
</style>
