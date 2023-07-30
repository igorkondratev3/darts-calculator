import { ref } from 'vue';

export const useElementVisibility = (startValue = false) => {
  const visibility = ref(startValue);
  const showElement = () => (visibility.value = true);
  const hideElement = () => (visibility.value = false);

  return { visibility, showElement, hideElement };
};
