<script setup>
const props = defineProps({
  player: String
});
defineEmits(['openAuthComp']);
const position = {};
if (props.player === 'P1') position.left = '4px';
else position.right = '4px';
</script>

<template>
  <button
    class="auth-link"
    :style="position"
    title="вход/регистрация"
    @click="$emit('openAuthComp')"
  >
    <img
      class="auth-link__icon"
      :class="{ 'auth-link__icon_rotate_180deg': props.player === 'P2' }"
      src="@/assets/images/login.svg"
      alt="login"
    />
  </button>
</template>

<style lang="scss">
@use '@/assets/css/mixins/fonts.scss';

.auth-link {
  position: absolute;
  width: 26px;
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

    &_rotate_180deg {
      transform: rotate(180deg);
    }
  }
}
</style>
