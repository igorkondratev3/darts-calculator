<script setup>
import { ref } from 'vue';
const props = defineProps({
  seenZero: Boolean,
  message: String
});

const buttons = ref([]);
const buttonsBox = ref(null);

const handleKeyup = (event) => {
  if (
    buttons.value[event.key] &&
    buttons.value[event.key]?.style.display !== 'none'
  )
    buttons.value[event.key].focus();
};

const handleClick = () => {
  buttonsBox.value.focus();
};
</script>

<template>
  <div
    class="dialog-content-wrapper number-darts-dialog"
    @click="handleClick"
    @keyup="handleKeyup"
  >
    <div class="number-darts-dialog__message">{{ props.message }}</div>
    <div class="number-darts-dialog__values" ref="buttonsBox" tabindex="1">
      <button
        class="number-darts-dialog__value"
        v-for="n in 4"
        :key="n + 'darts'"
        ref="buttons"
        v-show="props.seenZero || n !== 1"
      >
        {{ n - 1 }}
      </button>
    </div>
  </div>
</template>

<style lang="scss">
//dialog-content-wrapper на главной странице

.number-darts-dialog {
  &__message {
    width: 100%;
    font-size: 56px;
    font-weight: 700;
    text-align: center;
  }

  &__values {
    display: flex;
    margin-top: 32px;
    margin-bottom: 200px;
  }

  &__values:focus {
    border: none;
    outline: none;
  }

  &__value {
    width: 64px;
    height: 64px;
    margin-right: 16px;
    padding: 8px;
    outline: none;
    border: none;
    border-radius: 50%;
    font-size: 32px;
    color: white;
    background-color: rgb(66, 63, 63);
    transition: all 0.5s linear;
  }

  &__value:hover,
  &__value:focus {
    color: black;
    background-color: white;
  }
}
</style>
