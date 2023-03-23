export const defineFocusForNewLeg = (legNumber, setNumber) => {
  if (setNumber % 2) {
    if (legNumber % 2)
      setTimeout(
        () => document.forms[0][document.forms[0].length - 2].focus(),
        0
      );
    else
      setTimeout(
        () => document.forms[0][document.forms[0].length - 1].focus(),
        0
      );
  } else {
    if (legNumber % 2)
      setTimeout(
        () => document.forms[0][document.forms[0].length - 1].focus(),
        0
      );
    else
      setTimeout(
        () => document.forms[0][document.forms[0].length - 2].focus(),
        0
      );
  }
};

export const defineFocusForNextPlayer = (previousPlayer) => {
  if (previousPlayer === 'playerOne')
    setTimeout(
      () => document.forms[0][document.forms[0].length - 1].focus(),
      0
    );
  if (previousPlayer === 'playerTwo')
    setTimeout(
      () => document.forms[0][document.forms[0].length - 2].focus(),
      0
    );
};
