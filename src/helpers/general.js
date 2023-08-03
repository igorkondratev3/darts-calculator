import { useSvgStore } from '@/stores/svg.js';

export const getSvg = async (svgName) => {
  const URI = `${import.meta.env.VITE_BACKEND_URI}/svg?name=${svgName}`;
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
    console.error('error', error);
    return;
  }

  if (!text || !response.ok) {
    console.error('Неизвестная ошибка');
    return;
  }

  useSvgStore().setSvg(
    'darts',
    'data:image/svg+xml;base64,' + window.btoa(text)
  );
};


export const scrollToElement = (event) => {
  if (!event.currentTarget.value)
    event.currentTarget.scrollIntoView({ block: 'center' });
};