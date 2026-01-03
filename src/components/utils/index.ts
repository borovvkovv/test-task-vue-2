export const notEmptyStringValidation = (value: string) =>
  value !== '' && value !== undefined;

export const notNullOrUndefined = (value: Date) =>
  value !== null && value !== undefined;
