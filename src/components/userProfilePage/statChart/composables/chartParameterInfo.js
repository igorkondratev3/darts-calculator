import { ref } from 'vue';

export const useChartParameterInfo = (name) => {
  const parameterInfo = {
    countParameterName: defineCountParameterName(name),
    scoreParameterName: defineScoreParameterName(name),
    date: ref(''),
    score: ref(null),
    count: ref(null),

    fillInfo(date, value, count) {
      parameterInfo.date.value = date;
      parameterInfo.score.value = value;
      parameterInfo.count.value = count;
    },

    resetInfo() {
      parameterInfo.date.value = '';
      parameterInfo.score.value = null;
      parameterInfo.count.value = null;
    }
  };

  const parameterInfoVisivility = ref(false);

  const showParameterInfo = (date, value, count) => {
    parameterInfo.fillInfo(date, value, count);
    parameterInfoVisivility.value = true;
  };
  const hideParameterInfo = () => (parameterInfoVisivility.value = false);

  return {
    parameterInfo,
    parameterInfoVisivility,
    showParameterInfo,
    hideParameterInfo
  };
};

export const defineScoreParameterName = (chartName) => {
  if (chartName.includes('очков')) return 'количество';
  if (chartName === 'Процент удвоений') return 'средний процент';
  if (chartName === 'Наибольшие закрытия') return 'закрытие';
  return 'средний набор';
};

export const defineCountParameterName = (chartName) => {
  switch (chartName) {
    case 'Выигранные леги':
      return 'выиграно легов';
    case 'Проигранные леги':
      return 'проиграно легов';
    default:
      return 'сыграно легов';
  }
};
