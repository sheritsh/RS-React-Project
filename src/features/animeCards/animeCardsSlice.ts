import { createSlice } from '@reduxjs/toolkit';
import { Anime } from '../../types';

interface AnimeCardsState {
  anime: Anime[];
}

const initialState: AnimeCardsState = {
  anime: [],
};

export const animeCardsSlice = createSlice({
  name: 'animeCards',
  initialState,
  reducers: {},
});

export default animeCardsSlice.reducer;
