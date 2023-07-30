import { ref } from 'vue';

export const usePopUp = () => {
  const popUpMessage = {
    P1: ref(''),
    P2: ref('')
  };
  const showPopUp = (message, player) => (popUpMessage[player].value = message);
  const closePopUp = (player) => (popUpMessage[player].value = '');

  return { popUpMessage, showPopUp, closePopUp };
};
