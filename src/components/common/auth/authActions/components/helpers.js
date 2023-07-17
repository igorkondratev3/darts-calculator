import { deleteRefreshTokenFromDB } from '@/helpers/fetch.js';

export const login = (player, usersStore, emits) => {
  if (localStorage.getItem(`user${player}`)) {
    usersStore.login(player, JSON.parse(localStorage.getItem(`user${player}`)));
    return;
  }
  emits('openAuthComp');
};

export const logout = (player, usersStore) => {
  deleteRefreshTokenFromDB(usersStore.users[player].refreshToken);
  usersStore.logout(player);
  localStorage.removeItem(`user${player}`);
};