<script setup>
import { onUnmounted, ref } from 'vue';

defineProps({
  startRemainder: Number
});
const emits = defineEmits(['updateStartRemainder']);

const seenSelectRemainders = ref(false);

const setStartRemainder = (remainder) => {
  emits('updateStartRemainder', remainder);
  closeSelectRemainders();
};

const closeSelectRemainders = () => (seenSelectRemainders.value = false);

document.addEventListener('click', closeSelectRemainders);
onUnmounted(() => {
  document.removeEventListener('click', closeSelectRemainders);
});
//не нравится прослушиватель события на документе, подумать, если оставлю, то проверить
//корректное уничтожени события если буду менять v-if на компонент настройки игры
</script>

<template>
  <h3 class="game-setup__parameter-header">Формат матча</h3>
  <div class="game-setup__start-remainder start-remainder">
    <div
      class="start-remainder__header"
      tabindex="0"
      @click.stop="seenSelectRemainders = true"
      @keyup.enter="seenSelectRemainders = true"
      autofocus
    >
      {{ startRemainder }}
      <img
        class="arrow-down-icon"
        src="/src/assets/images/arrow_down.svg"
        alt="open"
      />
    </div>
    <div
      class="start-remainder__values"
      v-show="seenSelectRemainders"
      @click.stop=""
    >
      <div
        class="start-remainder__value"
        tabindex="0"
        @click="setStartRemainder(501)"
        @keyup.enter="setStartRemainder(501)"
      >
        501
      </div>
      <div
        class="start-remainder__value"
        tabindex="0"
        @click="setStartRemainder(1001)"
        @keyup.enter="setStartRemainder(1001)"
        @keydown.tab="closeSelectRemainders"
      >
        1001
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.start-remainder {
  align-self: center;

  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
    padding: 8px;
    padding-right: 16px;
    outline: none;
    border: 1px solid transparent;
    border-radius: 4px;
    font: inherit;
    text-align: center;
    cursor: default;
    background-color: rgb(221, 231, 231);

    &:focus {
      outline: 1px solid black;
    }
  }

  &__values {
    position: absolute;
    z-index: 2;
    border-radius: 4px;
    background-color: rgb(208, 216, 216);
  }

  &__value {
    width: 180px;
    margin-top: 4px;
    margin-bottom: 4px;
    padding: 8px;
    outline: none;
    border: 1px solid transparent;
    border-radius: 4px;
    font: inherit;
    text-align: center;
    cursor: default;
    background-color: rgb(221, 231, 231);

    &:hover,
    &:focus {
      background-color: rgb(146, 188, 214);
    }
  }
}

.arrow-down-icon {
  position: absolute;
  right: 0;
  width: 24px;
  height: 24px;
  display: block;
}
</style>
