<script setup>
import { watchEffect } from 'vue';
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

let position = {};
let xTranslateStartPosition;
let yTranslateStartPosition;
let transformEndPosition;
//не нравится - исправить
watchEffect(() => {
  switch (props.where) {
    case 'top':
      position.left = '50%';
      position.top = '0';
      xTranslateStartPosition = '-50%';
      yTranslateStartPosition = '-100%';
      transformEndPosition = `translate(-50%, ${props.howFar})`;
      break;

    case 'bottom':
      position.left = '50%';
      position.bottom = '0';
      xTranslateStartPosition = '-50%';
      yTranslateStartPosition = '100%';
      transformEndPosition = `translate(-50%, -${props.howFar})`;
      break;

    case 'left':
      position.top = '50%';
      position.left = '0';
      yTranslateStartPosition = '-50%';
      xTranslateStartPosition = '-100%';
      transformEndPosition = `translate(${props.howFar}, -50%)`;
      break;

    case 'right':
      position.top = '50%';
      position.right = '0';
      yTranslateStartPosition = '-50%';
      xTranslateStartPosition = '100%';
      transformEndPosition = `translate(-${props.howFar}, -50%)`;
      break;

    default:
      position.left = '50%';
      position.top = '0';
      xTranslateStartPosition = '-50%';
      yTranslateStartPosition = '-100%';
      transformEndPosition = `translate(-50%, ${props.howFar})`;
      break;
  }
});
</script>

<template>
  <Transition>
    <div class="popUp" v-if="props.popUpSeen" :style="position">
      {{ props.popUpMessage }} {{ props.where }}
    </div>
  </Transition>
</template>

<style lang="scss">
.popUp {
  position: fixed;
  transform: v-bind(transformEndPosition);
  z-index: 999;
  max-width: 300px;
  padding: 8px;
  border-radius: 8px;
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
