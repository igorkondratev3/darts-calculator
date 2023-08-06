import { deleteRefreshTokenFromDB } from '@/helpers/fetch.js';

export const login = (player, usersStore, showAuth) => {
  if (localStorage.getItem(`user${player}`))
    usersStore.login(player, JSON.parse(localStorage.getItem(`user${player}`)));
  else showAuth();
};

export const logout = (player, usersStore) => {
  deleteRefreshTokenFromDB(usersStore.users[player].refreshToken);
  usersStore.logout(player);
  localStorage.removeItem(`user${player}`);
};
