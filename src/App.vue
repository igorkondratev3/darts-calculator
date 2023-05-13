<script setup>
import { RouterView } from 'vue-router';
import { useSvgStore } from '@/stores/svg';

const svgStore = useSvgStore();

const getSvg = async (svg) => {
  const URI = `${import.meta.env.VITE_BACKEND_URI}/svg?name=${svg}`;
  const fetchParams = {
    method: 'GET',
    headers: {
      'Content-Type': 'image/svg+xml'
    }
  };
  let response;
  let text;
  try {
    response = await fetch(URI, fetchParams);
    text = await response.text();
  } catch (error) {
    console.log('error', error);
    return;
  }

  if (!text || !response.ok) {
    console.log('Неизвестная ошибка');
    return;
  }

  svgStore.setSvg('darts', 'data:image/svg+xml;base64,' + window.btoa(text));
};

getSvg('darts');
</script>

<template>
  <RouterView />
</template>

<style></style>
