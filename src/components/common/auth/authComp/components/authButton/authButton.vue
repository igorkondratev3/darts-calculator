<script setup>
import { toRef } from 'vue';
import { useUsersStore } from '@/stores/users';
import { useAuthButton } from './composables.js';

const props = defineProps({
  type: String,
  player: String,
  authInformation: Object
});
const emits = defineEmits(['changeErrorMessage', 'closeAuthComp']);

const usersStore = useUsersStore();

const { isEnabled, startAuth, auth } = useAuthButton(
  toRef(props, 'type'),
  props.player,
  props.authInformation,
  usersStore,
  emits
);
</script>

<template>
  <button
    class="auth__button"
    :class="{
      auth__button_disabled: !isEnabled || startAuth
    }"
    :disabled="!isEnabled || startAuth"
    @click="auth"
  >
    {{ props.type }}
  </button>
</template>

<style lang="scss">
@use '@/assets/css/mixins/fonts.scss';

.auth__button {
  width: calc(var(--base) * 1.6);
  height: calc(var(--base) * 0.56);
  margin-top: calc(var(--base) * 0.32);
  border: none;
  border-radius: calc(var(--base) * 0.08);
  cursor: pointer;
  @include fonts.Advent;
  background-color: #55b2f0;

  &_disabled {
    opacity: 40%;
  }

  &:focus-visible {
    outline: calc(var(--base) * 0.01) solid black;
    outline-offset: calc(var(--base) * 0.02);
  }

  &:active {
    box-shadow: calc(var(--base) * 0.1) calc(var(--base) * 0.05)
      calc(var(--base) * 0.05) gray;
  }
}
</style>
