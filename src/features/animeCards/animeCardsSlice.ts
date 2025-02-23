import { createSlice } from '@reduxjs/toolkit';
// import { Anime } from '../../types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface AnimeCardsState {
  selectedAnime: number[];
}

const initialState: AnimeCardsState = {
  selectedAnime: [],
};

export const animeCardsSlice = createSlice({
  name: 'animeCards',
  initialState,
  reducers: {
    addSelectedAnimeCard: (state, action: PayloadAction<number>) => {
      state.selectedAnime.push(action.payload);
    },
    removeSelectedAnimeCard: (state, action: PayloadAction<number>) => {
      state.selectedAnime = state.selectedAnime.filter(
        (anime) => anime !== action.payload
      );
    },
  },
});

export const { addSelectedAnimeCard, removeSelectedAnimeCard } =
  animeCardsSlice.actions;

export const selectIsAnimeCardSelected = (state: RootState, cardId: number) =>
  state.animeCards.selectedAnime.includes(cardId);

export default animeCardsSlice.reducer;
