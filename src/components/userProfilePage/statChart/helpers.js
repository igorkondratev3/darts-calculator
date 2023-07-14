export const calculateLineHeight = (chartHeight, maxValue, currentValue) =>
  (chartHeight / maxValue) * currentValue || 7;
//чтобы нулевые показатели были видны

export const calculateX = (indexLine, lineWidth) =>
  indexLine * lineWidth + indexLine;
export const calculateY = (chartHeight, maxValue, currentValue) =>
  chartHeight - calculateLineHeight(chartHeight, maxValue, currentValue);
