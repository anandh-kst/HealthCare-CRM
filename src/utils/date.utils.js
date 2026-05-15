import appConfig from '@config/app.config';

export const formatDate = (date) => {
  if (!date) return '—';
  return new Intl.DateTimeFormat(appConfig.defaultLocale, {
    year: 'numeric', month: 'short', day: 'numeric',
  }).format(new Date(date));
};

export const formatDateTime = (date) => {
  if (!date) return '—';
  return new Intl.DateTimeFormat(appConfig.defaultLocale, {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(new Date(date));
};

export const formatRelativeTime = (date) => {
  if (!date) return '—';
  const diff = Date.now() - new Date(date).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);

  if (mins < 1)   return 'Just now';
  if (mins < 60)  return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

export const isToday = (date) => {
  const d = new Date(date);
  const now = new Date();
  return d.toDateString() === now.toDateString();
};
