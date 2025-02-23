import { configureStore } from '@reduxjs/toolkit';
import animeCardsReducer from '../features/animeCards/animeCardsSlice';

export const store = configureStore({
  reducer: {
    animeCards: animeCardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
