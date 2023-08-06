import { ref } from 'vue';

export const useButtons = () => {
  const buttons = ref([]);

  const focusOnButton = (event) => {
    if (
      buttons.value[event.key] &&
      buttons.value[event.key]?.style.display !== 'none'
    )
      buttons.value[event.key].focus();
  };

  return { buttons, focusOnButton };
};
