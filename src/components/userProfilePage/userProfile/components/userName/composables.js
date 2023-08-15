import { ref } from 'vue';
import { updateTokens } from '@/helpers/auth.js';
import { changeData, checkCustomError } from '@/helpers/fetch.js';

export const useChangeName = () => {
  const errorMessage = ref('');
  const beginChange = ref(false);

  const changeName = async (event, player, usersStore, hideNameInput) => {
    beginChange.value = true;
    if (event.currentTarget.value === '') {
      event.currentTarget.focus();
      beginChange.value = false;
      return;
    }

    if (event.currentTarget.value === usersStore.users[player].name) {
      hideNameInput();
      beginChange.value = false;
      return;
    }

    try {
      const { response, json } = await changeData(player, usersStore, {
        changableParameter: { name: event.currentTarget.value }
      });
      await updateTokens(player, usersStore, json);
      await checkCustomError(json, response);
      usersStore.updateName(player, json.name);
      localStorage.setItem(
        `user${player}`,
        JSON.stringify(usersStore.users[player])
      );
      hideNameInput();
      beginChange.value = false;
    } catch (error) {
      errorMessage.value = error.message;
      hideNameInput();
      beginChange.value = false;
    }
  };

  return { errorMessage, beginChange, changeName };
};
