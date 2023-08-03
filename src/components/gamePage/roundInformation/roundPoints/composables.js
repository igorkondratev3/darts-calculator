import { ref, watch } from 'vue';

export const useRoundPoints = (points) => {
  const roundPoints = ref(points.value);

  watch(points, () => {
    roundPoints.value = points.value;
  });
  //подумать над этим - исчезают значения при hot reload когда этого нет

  const checkNumber = (remainder, event) => {
    if (event.data < '0' || event.data > '9') roundPoints.value = 0;
    if (
      roundPoints.value > 180 ||
      roundPoints.value < 0 ||
      roundPoints.value > remainder ||
      remainder - roundPoints.value === 1
    )
      roundPoints.value = Math.trunc(roundPoints.value / 10);
    if (roundPoints.value === 0) {
      roundPoints.value = '0';
      roundPoints.value = 0; //защита от нескольких нулей
    }
  };

  const setPoints = (emits) => {
    if (roundPoints.value || roundPoints.value === 0)
      emits('setPoints', roundPoints.value);
  };

  return { roundPoints, checkNumber, setPoints };
};
