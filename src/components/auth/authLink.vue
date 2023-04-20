<script setup>
defineEmits(['openAuthComp']);
</script>

<template>
  <button
    class="auth-link"
    title="вход/регистрация"
    @click="$emit('openAuthComp')"
  >
    <img class="auth-link__icon" src="@/assets/images/login.svg" alt="login" />
  </button>
</template>

<style lang="scss">
@use '@/assets/css/mixins/fonts.scss';

.auth-link {
  position: absolute;
  left: 4px;
  top: 4px;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  
  &:focus {
    outline: 1px solid black;
  }

  &__icon {
    width: 24px;
    height: 24px;
  }
}
</style>
