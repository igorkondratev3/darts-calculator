import { ref, watch } from 'vue';

export const useError = (header) => {
  const errorMessage = ref('');
  const changeErrorMessage = (message) => (errorMessage.value = message);

  watch(header, () => changeErrorMessage(''));

  return { errorMessage, changeErrorMessage };
};
