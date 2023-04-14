export const defineFocusForNewLeg = (legNumber, setNumber, points) => {
  if (setNumber % 2) {
    if (legNumber % 2) setTimeout(() => points[points.length - 2].focus(), 0);
    else setTimeout(() => points[points.length - 1].focus(), 0);
  } else {
    if (legNumber % 2) setTimeout(() => points[points.length - 1].focus(), 0);
    else setTimeout(() => points[points.length - 2].focus(), 0);
  }
};

export const defineFocusForNextPlayer = (previousPlayer, points) => {
  if (previousPlayer === 'playerOne')
    setTimeout(() => points[points.length - 1].focus(), 0);
  if (previousPlayer === 'playerTwo')
    setTimeout(() => points[points.length - 2].focus(), 0);
};
