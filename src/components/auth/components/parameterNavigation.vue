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
      <svg class="parameter-navigation__svg-area" v-if="!(n === 1)">
        <line
          class="parameter-navigation__line"
          :class="{
            'parameter-navigation__line_width_1': props.authType === 'Вход',
            'parameter-navigation__line_width_2':
              props.authType === 'Регистрация'
          }"
          x1="10%"
          y1="50%"
          x2="90%"
          y2="50%"
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
  </nav>
</template>

<style lang="scss">
@use '@/assets/css/mixins/fonts.scss';

.auth__parameter-navigation {
  display: flex;
  justify-content: center;
  margin-top: calc(var(--base) * 0.32);
}

.parameter-navigation {
  &__svg-area {
    height: calc(var(--base) * 0.4);
    width: calc(var(--base) * v-bind(lineWidth) / 100);
  }

  &__line {
    stroke: rgb(0, 0, 0);
    &_width_1 {
      stroke-width: 1%;
    }
    &_width_2 {
      stroke-width: 2%;
    }
  }

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(var(--base) * 0.4);
    height: calc(var(--base) * 0.4);
    border: calc(var(--base) * 0.01) solid black;
    border-radius: 50%;
    cursor: pointer;
    @include fonts.Advent;

    &:focus {
      outline: calc(var(--base) * 0.01) solid black;
      outline-offset: calc(var(--base) * 0.02);
    }
  }

  &__current::before {
    position: absolute;
    content: '';
    top: calc(var(--base) * -0.2);
    left: calc(var(--base) * 0.13);
    width: calc(var(--base) * 0.12);
    height: calc(var(--base) * 0.12);
    border: solid black;
    border-width: 0 0.1em 0.1em 0;
    transform: rotate(45deg);
  }

  &__completed {
    background-color: #55b2f0;
    border-color: #55b2f0;
  }
}
</style>
