export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const isPhone = (value) => /^\+?[\d\s\-()]{7,15}$/.test(value);

export const isRequired = (value) =>
  value !== null && value !== undefined && String(value).trim() !== '';

export const minLength = (value, min) => String(value).length >= min;

export const maxLength = (value, max) => String(value).length <= max;
