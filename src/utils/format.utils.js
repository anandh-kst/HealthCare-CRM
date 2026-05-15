export const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';

export const formatFullName = (firstName, lastName) =>
  [firstName, lastName].filter(Boolean).join(' ');

export const formatPhone = (phone) => {
  if (!phone) return '—';
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone;
};

export const truncate = (str, length = 50) =>
  str?.length > length ? `${str.slice(0, length)}...` : str;

export const formatCurrency = (amount, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount ?? 0);
