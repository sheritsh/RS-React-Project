import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import type { Anime } from '../../types';
import { SerializedError } from '@reduxjs/toolkit/react';
import { setAllAnime } from '../animeCards/animeCardsSlice';

interface AnimeResponse {
  data: Anime[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4/anime' }),
  endpoints: (build) => ({
    fetchAnime: build.query<
      AnimeResponse,
      { searchTerm: string; page: number }
    >({
      query: ({ searchTerm, page }) => {
        const url = searchTerm
          ? `?q=${searchTerm}&page=${page}`
          : `?page=${page}`;
        return url;
      },
      async onQueryStarted(_unused, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAllAnime(data.data)); // Сохраняем данные в animeCardsSlice
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        }
      },
    }),
    fetchAnimeDetails: build.query<{ data: Anime }, number>({
      query: (id) => ({ url: `/${id}` }),
    }),
  }),
});

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError
): string => {
  if ('status' in error) {
    const fetchError = error as FetchBaseQueryError;
    return `Ошибка ${fetchError.status}: ${
      (fetchError.data as { message?: string })?.message || 'Неизвестная ошибка'
    }`;
  } else {
    return `Ошибка: ${error.message || 'Неизвестная'}`;
  }
};

export const { useFetchAnimeQuery, useFetchAnimeDetailsQuery } = apiSlice;
