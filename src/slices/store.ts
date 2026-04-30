import { configureStore } from '@reduxjs/toolkit';
import giftReducer from './giftSlice';

export const store = configureStore({
  reducer: {
    gift: giftReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
