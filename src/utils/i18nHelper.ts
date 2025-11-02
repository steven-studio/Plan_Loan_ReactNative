// src/utils/i18nHelper.ts (或 .js)
export const formatCurrency = (amount: number): string => {
  return `NT$${amount.toLocaleString()}`;
};

export const formatString = (
  template: string, 
  values: Record<string, any>
): string => {
  return template.replace(/{(\w+)}/g, (match, key) => {
    return values[key] !== undefined ? String(values[key]) : match;
  });
};