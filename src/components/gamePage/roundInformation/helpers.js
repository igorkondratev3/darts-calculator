export const calculateRemainder = (
  roundPoints,
  player,
  remainderBeforeGetPoints,
  roundNumber,
  emits
) => {
  let remainderAfterGetPoints = remainderBeforeGetPoints - roundPoints;
  if (remainderAfterGetPoints > 1)
    emits(
      'setPointsAndRemainder',
      roundPoints,
      remainderAfterGetPoints,
      player,
      roundNumber
    );
  if (remainderAfterGetPoints === 0) emits('legCompleted', player);
};
