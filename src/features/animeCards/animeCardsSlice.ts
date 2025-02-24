import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Anime } from '../../types';

interface AnimeCardsState {
  selectedAnime: number[];
  allAnime: Anime[];
}

const initialState: AnimeCardsState = {
  selectedAnime: [],
  allAnime: [],
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
    unselectAllAnimeCards: (state) => {
      state.selectedAnime = [];
    },
    setAllAnime: (state, action: PayloadAction<Anime[]>) => {
      state.allAnime = action.payload;
    },
  },
});

export const downloadSelectedAnimeCards = createAsyncThunk(
  'animeCards/downloadSelectedAnimeCards',
  async (selectedAnimeData: Anime[], { dispatch }) => {
    const headers = [
      'Title',
      'Image URL',
      'Synopsis',
      'Rating',
      'Episodes',
      'Status',
      'Year',
    ].join(',');

    const rows = selectedAnimeData.map((anime) => {
      const { title, images, synopsis, score, episodes, status, year } = anime;

      const escapedTitle = title ? `"${title.replace(/"/g, '""')}"` : '';
      const escapedSynopsis = `"${(synopsis || '').replace(/"/g, '""')}"`;

      return [
        escapedTitle,
        images?.webp?.image_url || '',
        escapedSynopsis,
        score || 'N/A',
        episodes || 'N/A',
        status || 'N/A',
        year || 'N/A',
      ].join(',');
    });

    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows.join('\n')}`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${selectedAnimeData.length}_anime.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    dispatch(unselectAllAnimeCards());
  }
);

export const {
  addSelectedAnimeCard,
  removeSelectedAnimeCard,
  unselectAllAnimeCards,
  setAllAnime,
} = animeCardsSlice.actions;

export const selectIsAnimeCardSelected = (state: RootState, cardId: number) =>
  state.animeCards.selectedAnime.includes(cardId);

export const selectAllAnime = (state: RootState) => state.animeCards.allAnime;

export default animeCardsSlice.reducer;
