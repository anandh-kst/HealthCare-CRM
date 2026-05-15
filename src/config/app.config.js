import env from './env.config';

const appConfig = {
  appName:        env.APP_NAME || 'Care Dashboard',
  appVersion:     env.APP_VERSION || '1.0.0',
  defaultLocale:  'en-US',
  dateFormat:     'MMM DD, YYYY',
  timeFormat:     'hh:mm A',
  paginationSize: 10,
};

export default appConfig;
