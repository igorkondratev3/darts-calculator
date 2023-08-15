import { updateTokens } from '@/helpers/auth.js';
import { deleteData, checkCustomError } from '@/helpers/fetch.js';

export const deleteUser = async (player, usersStore, router) => {
  try {
    const { response, json } = await deleteData(player, usersStore);
    await updateTokens(player, usersStore, json);
    await checkCustomError(json, response);
    usersStore.logout(player);
    localStorage.removeItem(`user${player}`);
    router.push('/');
  } catch (error) {
    console.error(error);
  }
};
