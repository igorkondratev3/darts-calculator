<script setup>
import { computed } from 'vue';
const props = defineProps({
  parameterNumber: Number,
  authType: String, //возможно лучше сразу передавать информацию о количестве кнопок - меньше связность
  authInformation: Object
});
defineEmits(['changeParameterNumber'])

const lineWidth = computed(() => (props.authType === 'Вход' ? 120 : 40));

</script>

<template>
  <nav class="auth__parameter-navigation parameter-navigation">
    <button
      class="parameter-navigation__button"
      :class="{
        'parameter-navigation__current': parameterNumber === 1,
        'parameter-navigation__completed':
          (authType === 'Вход' && authInformation.email.value) ||
          (authType === 'Регистрация' && authInformation.name.value)
      }"
      @click="$emit('changeParameterNumber', 1)"
    >
      1
    </button>
    <svg height="40" :width="lineWidth">
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
        'parameter-navigation__current': parameterNumber === 2,
        'parameter-navigation__completed':
          (authType === 'Вход' && authInformation.password.value) ||
          (authType === 'Регистрация' && authInformation.email.value)
      }"
      @click="$emit('changeParameterNumber', 2)"
    >
      2
    </button>
    <template v-if="authType === 'Регистрация'">
      <svg height="40" :width="lineWidth">
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
          'parameter-navigation__current': parameterNumber === 3,
          'parameter-navigation__completed': authInformation.password.value
        }"
        @click="$emit('changeParameterNumber', 3)"
      >
        3
      </button>
      <svg height="40" :width="lineWidth">
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
          'parameter-navigation__current': parameterNumber === 4,
          'parameter-navigation__completed':
            authInformation.repeatPassword.value
        }"
        @click="$emit('changeParameterNumber', 4)"
      >
        4
      </button>
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

.parameter-navigation__button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  @include fonts.Advent;
  cursor: pointer;

  &:focus {
    outline: 1px solid black;
    outline-offset: 2px;
  }
}

.parameter-navigation__current {
  /*outline: 3px solid #1892e4;
  outline-offset: 2px;*/

  &::before {
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
}
.parameter-navigation__completed {
  background-color: #55b2f0;
  border-color: #55b2f0;
}
</style>
