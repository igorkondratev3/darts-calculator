import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSvgStore = defineStore('svgs', () => {
  const svg = {
    darts: ref('')
  };
  const setSvg = (name, val) => (svg[name].value = val);

  return { svg, setSvg };
});
