import { ref, onActivated } from 'vue';

export const useName = (nameInput) => {
  const name = ref('');

  onActivated(() => {
    nameInput.value.focus();
  });

  return name;
};
