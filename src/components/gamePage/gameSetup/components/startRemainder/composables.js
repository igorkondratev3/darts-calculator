import { ref, watch, onUnmounted } from 'vue';

export const useSeenSelectRemainders = (startRemainder) => {
  const seenSelectRemainders = ref(false);
  const showSelectRemainders = () => (seenSelectRemainders.value = true);
  const closeSelectRemainders = () => (seenSelectRemainders.value = false);

  watch(startRemainder, closeSelectRemainders);

  document.addEventListener('click', closeSelectRemainders);
  onUnmounted(() => {
    document.removeEventListener('click', closeSelectRemainders);
  });
  //не нравится прослушиватель события на документе, подумать, если оставлю, то проверить
  //корректное уничтожени события если буду менять v-if на компонент настройки игры

  return { seenSelectRemainders, showSelectRemainders, closeSelectRemainders };
};
