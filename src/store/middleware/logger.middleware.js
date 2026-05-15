const loggerMiddleware = (store) => (next) => (action) => {
  console.warn('[Redux]', action.type, store.getState());
  return next(action);
};

export default loggerMiddleware;
