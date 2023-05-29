import { useSavedGame } from '@/stores/savedGame.js';

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

export const getNumberDarts = async (numberDarts) => {
  numberDarts.showModal();
  const promise = new Promise((resolve) => {
    numberDarts.children[0].addEventListener('click', function hadler(event) {
      if (event.target.nodeName === 'BUTTON') {
        numberDarts.children[0].removeEventListener('click', hadler);
        resolve(Number(event.target.innerHTML));
      }
    });
  });
  const endNumberDarts = await promise;
  numberDarts.close();
  return endNumberDarts;
};

export const changeOldValues = (player, point, roundNumber, legNumber) => {
  const difference = player.legPoints.value[roundNumber - 1] - point;
  player.legPoints.value[roundNumber - 1] = point;
  for (let i = roundNumber - 1; i < player.legRemainders.value.length; i++)
    player.legRemainders.value[i] += difference;
  player.pointsAndDartsLegs.value[legNumber - 1][0] -= difference;
};

export const saveGame = async (modal, gameInfo) => {
  modal.showModal();
  const promise = new Promise((resolve) => {
    modal.children[0].addEventListener('click', function hadler(event) {
      if (event.target.nodeName === 'BUTTON') {
        modal.children[0].removeEventListener('click', hadler);
        if (event.target.textContent === ' Сохранить матч ') {
          useSavedGame().setGame(gameInfo);
          resolve(true);
        }

        if (event.target.textContent.trim() === 'Не сохранять') resolve(true);

        if (event.target.textContent.trim() === 'Отмена') resolve(false);
      }
    });
  });
  const leavePage = await promise;
  if (!leavePage) modal.close();
  return leavePage;
};
