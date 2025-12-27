export const notEmptyStringValidation = (value) =>
  value !== '' && value !== undefined;

export const dateFormatValidation = (value) =>
  /^\d{2}[./-]\d{2}[./-]\d{4}$/.test(value);
