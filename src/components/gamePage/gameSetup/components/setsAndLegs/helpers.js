export const changeValuesToWin = (parameterName, event, emits) => {
  let newValue = Number(event.currentTarget.value);
  if (event.data < '0' || event.data > '9') newValue = 1;
  emits(`update:${parameterName}`, newValue);
};

export const changeAreSetsInGame = (event, areSetsInGame, emits) => {
  if (event.type === 'change')
    emits('update:areSetsInGame', event.currentTarget.checked);
  else emits('update:areSetsInGame', !event.currentTarget.checked);
  checkAreSetsInGame(
    event.currentTarget.previousElementSibling,
    areSetsInGame,
    emits
  );
};

const checkAreSetsInGame = (setInput, areSetsInGame, emits) => {
  //так как emit отработает после выполнения функции значения поменяны на обратные
  //можно передавать в функцию сразу актуальный параметр - подумать
  if (areSetsInGame) emits('update:setsToWin', 1);
  if (!areSetsInGame) setTimeout(() => setInput.focus(), 0);
};
