<script setup>
import UserName from './components/userName/userName.vue';
import DeleteUser from './components/deleteUser/deleteUser.vue';

defineProps({
  player: String
});
</script>

<template>
  <div class="user-profile__information user-information">
    <DeleteUser :player="player" />
    <div class="user-information__avatar avatar">
      <img
        class="avatar__img"
        src="/src/assets/images/yes_login.svg"
        alt="avatar"
      />
    </div>
    <UserName :player="player" />
  </div>
</template>

<style lang="scss">
.user-information {
  display: flex;
  align-items: flex-start;
  margin-top: calc(var(--base) * 0.32);
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
  }
}
</style>
