import { configureStore } from '@reduxjs/toolkit';
import animeCardsReducer from '../features/animeCards/animeCardsSlice';
import { apiSlice } from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    animeCards: animeCardsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
