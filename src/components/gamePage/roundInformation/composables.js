import { computed } from 'vue';

export const useRoundPointsVisibility = (
  player,
  legNumber,
  setNumber,
  remainderBeforeGetPointsAnotherPlayer,
  remainderAfterGetPointsAnotherPlayer
) => {
  if (player === 'P1')
    return computed(() =>
      Boolean(
        (legNumber.value % 2 &&
          setNumber.value % 2 &&
          remainderBeforeGetPointsAnotherPlayer.value) ||
          (legNumber.value % 2 === 0 &&
            setNumber.value % 2 &&
            remainderAfterGetPointsAnotherPlayer.value) ||
          (legNumber.value % 2 === 0 &&
            setNumber.value % 2 === 0 &&
            remainderBeforeGetPointsAnotherPlayer.value) ||
          (legNumber.value % 2 &&
            setNumber.value % 2 === 0 &&
            remainderAfterGetPointsAnotherPlayer.value)
      )
    );

  if (player === 'P2')
    return computed(() =>
      Boolean(
        (legNumber.value % 2 === 0 &&
          setNumber.value % 2 &&
          remainderBeforeGetPointsAnotherPlayer.value) ||
          (legNumber.value % 2 &&
            setNumber.value % 2 &&
            remainderAfterGetPointsAnotherPlayer.value) ||
          (legNumber.value % 2 &&
            setNumber.value % 2 === 0 &&
            remainderBeforeGetPointsAnotherPlayer.value) ||
          (legNumber.value % 2 === 0 &&
            setNumber.value % 2 === 0 &&
            remainderAfterGetPointsAnotherPlayer.value)
      )
    );
};
