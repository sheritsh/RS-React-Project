import React from 'react';
import {
  unselectAllAnimeCards,
  downloadSelectedAnimeCards,
  selectAllAnime,
} from '../features/animeCards/animeCardsSlice';
import { RootState } from '../app/store';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const Flyout: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedAnime = useAppSelector(
    (state: RootState) => state.animeCards.selectedAnime
  );
  const allAnime = useAppSelector((state: RootState) => selectAllAnime(state));

  const handleDownload = () => {
    const selectedAnimeData = allAnime.filter((anime) =>
      selectedAnime.includes(anime.mal_id!)
    );

    dispatch(downloadSelectedAnimeCards(selectedAnimeData));
  };

  if (selectedAnime.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 shadow-lg z-10">
      <div className="flex justify-between items-center">
        <span className="text-black dark:text-white">
          {selectedAnime.length} аниме выбрано для загрузки данных
        </span>
        <div>
          <button
            onClick={() => dispatch(unselectAllAnimeCards())}
            className="mr-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded cursor-pointer select-none"
          >
            Отменить выбранные
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer select-none"
          >
            Скачать
          </button>
        </div>
      </div>
    </div>
  );
};

export default Flyout;
