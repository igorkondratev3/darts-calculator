<script setup>
import { defineAsyncComponent } from 'vue';
import { useUsersStore } from '@/stores/users.js';
import NameInput from '@/components/common/auth/authComp/components/inputs/name/nameInput.vue';
import { useElementVisibility } from '@/composables/elementVisibility.js';
import { useChangeName } from './composables.js';
const PopUp = defineAsyncComponent({
  loader: () => import('@/components/common/popUp/popUp.vue')
});

defineProps({
  player: String
});

const usersStore = useUsersStore();

const {
  visibility: nameInputVisibility,
  showElement: showNameInput,
  hideElement: hideNameInput
} = useElementVisibility();

const { errorMessage, beginChange, changeName } = useChangeName();
</script>

<template>
  <div class="user-information__name-wrapper" v-show="!nameInputVisibility">
    <h3 class="user-information__name">
      {{ usersStore.users[player]?.name }}
    </h3>
    <button
      class="user-information__settings-button settings-button"
      @click="showNameInput"
    >
      <img
        src="/src/assets/images/edit.svg"
        alt="edit"
        class="icon-32"
        title="изменить имя"
      />
    </button>
  </div>
  <div v-if="nameInputVisibility" class="user-information__change-name">
    <NameInput
      :disabled="beginChange"
      :startName="usersStore.users[player]?.name"
      @keydown.enter.prevent="$event.currentTarget.blur()"
      @blur="changeName($event, player, usersStore, hideNameInput)"
    />
  </div>
  <PopUp
    :popUpSeen="Boolean(errorMessage)"
    :popUpMessage="errorMessage"
    :popUpDuration="4000"
    where="top"
    howFar="0px"
    @closePopUp="errorMessage = ''"
  />
</template>

<style lang="scss">
@use '@/assets/css/mixins/fonts.scss';

.user-information {
  &__name-wrapper {
    display: flex;
    align-items: center;
  }

  &__name {
    font-size: calc(var(--base) * 0.48);
  }

  &__settings-button {
    margin-left: calc(var(--base) * 0.08);
    margin-top: calc(var(--base) * 0.16);
  }
}

.user-information__change-name {
  display: flex;
  flex-direction: column;
}

.auth__input {
  display: block;
  align-self: center;
  height: calc(var(--base) * 0.64);
  width: calc(var(--base) * 3.2);
  padding: calc(var(--base) * 0.16) calc(var(--base) * 0.24)
    calc(var(--base) * 0.24) calc(var(--base) * 0.24);
  outline: none;
  border: calc(var(--base) * 0.01) solid rgba(0, 0, 0, 0.5);
  background-color: white;
  @include fonts.Advent;

  &::placeholder {
    @include fonts.Advent($color: rgba(0, 0, 0, 0.8));
  }

  &_border-invalid {
    border-color: rgb(235, 94, 94);
  }

  &_border-valid {
    border-color: #55b2f0;
  }
  &:disabled {
    opacity: 30%;
  }
}

@media (max-width: 800px) {
  .user-information__name-wrapper {
    align-self: center;
    order: -1;
    margin-bottom: calc(var(--base) * 0.04);
  }

  .user-information__change-name {
    order: -1;
  }
}
</style>
