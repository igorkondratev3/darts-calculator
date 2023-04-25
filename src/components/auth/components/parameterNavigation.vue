<script setup>
import { computed } from 'vue';
const props = defineProps({
  parameterNumber: Number,
  authType: String,
  authInformation: Object
});
defineEmits(['changeParameterNumber']);

const lineWidth = computed(() => (props.authType === 'Вход' ? 120 : 40));
const numberOfButtons = computed(() => (props.authType === 'Вход' ? 2 : 4));
const isCompleted = computed(() => [
  (props.authType === 'Вход' && props.authInformation.email.value) ||
    (props.authType === 'Регистрация' && props.authInformation.name.value),
  (props.authType === 'Вход' && props.authInformation.password.value) ||
    (props.authType === 'Регистрация' && props.authInformation.email.value),
  props.authInformation.password.value,
  props.authInformation.repeatPassword.value
]);
</script>

<template>
  <nav class="auth__parameter-navigation parameter-navigation">
    <template v-for="n in numberOfButtons" :key="n + 'button'">
      <template v-if="!(authType === 'Вход' && (n === 3 || n === 4))">
        <svg v-if="!(n === 1)" height="40" :width="lineWidth">
          <line
            x1="10"
            y1="20"
            :x2="lineWidth - 10"
            y2="20"
            style="stroke: rgb(0, 0, 0); stroke-width: 1"
          />
        </svg>
        <button
          class="parameter-navigation__button"
          :class="{
            'parameter-navigation__current': parameterNumber === n,
            'parameter-navigation__completed': isCompleted[n - 1]
          }"
          @click="$emit('changeParameterNumber', n)"
        >
          {{ n }}
        </button>
      </template>
    </template>
  </nav>
</template>

<style lang="scss">
@use '@/assets/css/mixins/fonts.scss';

.auth__parameter-navigation {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}

.parameter-navigation {
  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border: 1px solid black;
    border-radius: 50%;
    @include fonts.Advent;
    cursor: pointer;

    &:focus {
      outline: 1px solid black;
      outline-offset: 2px;
    }
  }

  &__current::before {
    position: absolute;
    content: '';
    top: -20px;
    left: 13px;
    width: 12px;
    height: 12px;
    border: solid black;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  &__completed {
    background-color: #55b2f0;
    border-color: #55b2f0;
  }
}
</style>
