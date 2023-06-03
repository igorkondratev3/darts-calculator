import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSavedGame = defineStore('savedGame', () => {
  const savedGame = ref(null);
  const setGame = (gameInfo) => {
    savedGame.value = gameInfo;
  };
  const resetGame = () => (savedGame.value = null);
  return { savedGame, setGame, resetGame };
});
