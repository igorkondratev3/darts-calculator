<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUsersStore } from '@/stores/users.js';
import { deleteUser } from './deleteUser.js';
import { showModal, closeModal } from '@/helpers/modal.js';

defineProps({
  player: String
});

const usersStore = useUsersStore();
const router = useRouter();

const deleteModal = ref(null);
</script>

<template>
  <button
    class="user-information__delete-button settings-button"
    @click="showModal(deleteModal)"
  >
    <img
      src="/src/assets/images/delete.svg"
      alt="delete"
      class="icon-32"
      title="удалить профиль"
    />
  </button>
  <dialog class="dialog" ref="deleteModal" @cancel.prevent="">
    <div class="dialog-content-wrapper">
      <div class="delete-message">
        <p class="p-message">
          Вы собираетесь удалить свой профиль. Вместе с ним будет удалена
          статистика матчей. Подтвердите удаление профиля.
        </p>
        <div class="buttons">
          <button
            class="delete-buttons base-button"
            @click="deleteUser(player, usersStore, router)"
          >
            Удалить профиль
          </button>
          <button
            class="delete-buttons base-button"
            @click="closeModal(deleteModal)"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  </dialog>
</template>

<style lang="scss">
@use '@/assets/css/mixins/fonts.scss';

.user-information__delete-button {
  position: absolute;
  z-index: 2;
  bottom: 0;
}

.dialog {
  border: none;
}

.dialog-content-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: calc(var(--base) * 0.08);
  @include fonts.Advent;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.264);
  backdrop-filter: blur(calc(var(--base) * 0.1));
  overflow: auto;

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

.delete-message {
  max-width: calc(var(--base) * 6);
  font-size: calc(var(--base) * 0.32);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(var(--base) * 0.32);
  background-color: rgb(232, 238, 233);
  padding: calc(var(--base) * 0.16);
  border-radius: calc(var(--base) * 0.16);
  margin-bottom: calc(var(--base) * 1.28);
}
.p-message {
  text-align: center;
}

.buttons {
  display: flex;
  gap: calc(var(--base) * 0.16);
}

.delete-buttons {
  font-weight: 700;

  &:active {
    box-shadow: calc(var(--base) * 0.1) calc(var(--base) * 0.05)
      calc(var(--base) * 0.05) rgb(89, 89, 89);
  }
}
</style>
