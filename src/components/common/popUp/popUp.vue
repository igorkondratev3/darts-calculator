<script setup>
import { watchEffect } from 'vue';
import { getCoordinates } from './helpers.js';

const props = defineProps({
  popUpSeen: Boolean,
  popUpMessage: String,
  popUpDuration: Number,
  where: String,
  howFar: String
});
const emit = defineEmits(['closePopUp']);

watchEffect(() => {
  if (props.popUpSeen) {
    setTimeout(() => emit('closePopUp'), props.popUpDuration);
  }
});

const {
  position,
  xTranslateStartPosition,
  yTranslateStartPosition,
  transformEndPosition
} = getCoordinates(props.where, props.howFar);
</script>

<template>
  <Transition>
    <div class="popUp" v-if="props.popUpSeen" :style="position">
      {{ props.popUpMessage }}
    </div>
  </Transition>
</template>

<style lang="scss">
.popUp {
  position: fixed;
  transform: v-bind(transformEndPosition);
  z-index: 999;
  max-width: calc(var(--base) * 3);
  min-height: calc(var(--base) * 0.74);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: calc(var(--base) * 0.08);
  border-radius: calc(var(--base) * 0.08);
  font: inherit;
  text-align: center;
  background-color: rgb(235, 94, 94);
}

.v-enter-from,
.v-leave-to {
  transform: translate(
    v-bind(xTranslateStartPosition),
    v-bind(yTranslateStartPosition)
  );
}

.v-enter-active,
.v-leave-active {
  transition: all 1s;
}

.v-enter-to,
.v-leave-from {
  transform: v-bind(transformEndPosition);
}
</style>
