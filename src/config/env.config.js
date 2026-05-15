const env = {
  API_BASE_URL:       import.meta.env.VITE_API_BASE_URL,
  APP_NAME:           import.meta.env.VITE_APP_NAME,
  APP_VERSION:        import.meta.env.VITE_APP_VERSION,
  TOKEN_KEY:          import.meta.env.VITE_TOKEN_KEY,
  REFRESH_TOKEN_KEY:  import.meta.env.VITE_REFRESH_TOKEN_KEY,
  IS_DEV:             import.meta.env.DEV,
  IS_PROD:            import.meta.env.PROD,
};

export default env;
