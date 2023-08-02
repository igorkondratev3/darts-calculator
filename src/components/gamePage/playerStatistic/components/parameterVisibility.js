export const changeParameterVisibility = (event, emits) => {
  if (event.target.type === 'checkbox')
    emits(
      'update:parameterVisibility',
      event.target.dataset.groupName,
      event.target.dataset.parameterName,
      !event.target.checked
    );
};

export const updateParameterVisibility = (elem, emits) => {
  if (elem.groupName === 'leg') {
    emits('update:seenAveragePointsLeg', elem.checked);
    return;
  }
  emits(
    'update:parameterVisibility',
    elem.dataset.groupName,
    elem.dataset.parameterName,
    elem.checked
  );
};

export const closeStatisticsVisibilitySettings = (
  player,
  seenParametersGame,
  seenParametersSet,
  seenAveragePointsLeg,
  emits
) => {
  localStorage.setItem(
    `seenParametersGame${player}`,
    JSON.stringify(seenParametersGame)
  );
  localStorage.setItem(
    `seenParametersSet${player}`,
    JSON.stringify(seenParametersSet)
  );
  localStorage.setItem(
    `seenAveragePointsLeg${player}`,
    JSON.stringify(seenAveragePointsLeg)
  );
  emits('closeStatisticsVisibilitySettings');
};
