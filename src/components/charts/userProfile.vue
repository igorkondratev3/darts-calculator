<script setup>
import { useUsersStore } from '@/stores/users.js';

defineProps({
  player: String
});

const usersStore = useUsersStore();
</script>

<template>
  <div class="user-profile__information user-information">
    <div class="user-information__avatar avatar">
      <img
        class="avatar__img"
        src="/src/assets/images/yes_login.svg"
        alt="avatar"
      />
    </div>
    <h3 class="user-information__name">
      {{ usersStore.users[player].name }}
    </h3>
  </div>
</template>

<style lang="scss">
.user-information {
  display: flex;
  align-items: flex-start;
  margin-top: calc(var(--base) * 0.32);

  &__name {
    font-size: calc(var(--base) * 0.48);
  }
}

.avatar {
  border: calc(var(--base) * 0.01) solid black;
  border-radius: 50%;

  &__img {
    display: block;
    width: calc(var(--base) * 2.56);
    height: calc(var(--base) * 2.56);
  }
}

@media (max-width: 800px) {
  .user-information {
    flex-direction: column;
    align-self: center;
    margin-top: calc(var(--base) * 0.92);

    &__name {
      align-self: center;
    }
  }
}
</style>
