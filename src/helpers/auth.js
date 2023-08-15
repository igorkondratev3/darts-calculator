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

export const updateTokens = async (player, usersStore, json) => {
  if (json && Object.hasOwn(json, 'newTokens')) {
    usersStore.updateTokens(
      player,
      json.newTokens.token,
      json.newTokens.refreshToken
    );
    const user = JSON.parse(localStorage.getItem(`user${player}`));
    user.token = json.newTokens.token;
    user.refreshToken = json.newTokens.refreshToken;
    localStorage.setItem(`user${player}`, JSON.stringify(user));
  }
};
