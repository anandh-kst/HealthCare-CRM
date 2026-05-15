import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import rootReducer from './rootReducer';
import loggerMiddleware from './middleware/logger.middleware';
import env from '@config/env.config';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    env.IS_DEV
      ? getDefaultMiddleware().concat(loggerMiddleware)
      : getDefaultMiddleware(),
  devTools: env.IS_DEV,
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
