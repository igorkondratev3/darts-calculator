import { ref, onActivated, onMounted } from 'vue';

export const useName = (nameInput, startName = '') => {
  const name = ref(startName);

  onActivated(() => {
    nameInput.value.focus();
  });

  onMounted(() => {
    nameInput.value.focus();
  });

  return name;
};
