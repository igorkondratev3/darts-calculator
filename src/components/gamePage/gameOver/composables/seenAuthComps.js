import { ref } from 'vue';

export const useSeenAuthComps = () => {
  const seenAuthComps = {
    P1: ref(false),
    P2: ref(false),
    show(player) {
      this[player].value = true;
    },
    close(player) {
      this[player].value = false;
    }
  };

  return seenAuthComps;
};
