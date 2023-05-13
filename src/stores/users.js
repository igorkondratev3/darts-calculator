import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUsersStore = defineStore('users', () => {
  const users = {
    P1: ref(null),
    P2: ref(null)
  };
  const login = (player, aboutPlayer) => (users[player].value = aboutPlayer);
  const logout = (player) => (users[player].value = null);
  const updateTokens = (player, token, refreshToken) => {
    users[player].value.token = token;
    users[player].value.refreshToken = refreshToken;
  };
  const swap = () => {
  const  playerOne = users.P1.value;
    users.P1.value = users.P2.value;
    users.P2.value = playerOne;
  }

  return { users, login, logout, updateTokens, swap };
});
