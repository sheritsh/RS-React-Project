import { FC } from 'react';
import { Anime } from '../types';
import { useAppDispatch } from '../app/hooks';
import { useSelector } from 'react-redux';
import {
  addSelectedAnimeCard,
  removeSelectedAnimeCard,
  selectIsAnimeCardSelected,
} from '../features/animeCards/animeCardsSlice';
import { RootState } from '../app/store';

interface CardProps {
  anime: Anime;
  onAnimeSelect: (anime: Anime) => void;
}

const Card: FC<CardProps> = ({ anime, onAnimeSelect }) => {
  const dispatch = useAppDispatch();
  const isAnimeSelected = useSelector((state: RootState) =>
    selectIsAnimeCardSelected(state, anime.mal_id!)
  );

  const toggleSelectAnime = (id: number | undefined) => {
    if (!id) return;

    if (isAnimeSelected) {
      dispatch(removeSelectedAnimeCard(id));
      return;
    }

    dispatch(addSelectedAnimeCard(id));
  };

  return (
    <div
      role="article"
      className="card transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-101 p-4 bg-white shadow-md rounded-lg w-full flex"
    >
      <img
        src={anime.images?.webp?.image_url || ''}
        alt={anime.title}
        className="w-32 h-32 object-cover rounded-lg mr-4 cursor-pointer"
        onClick={() => onAnimeSelect(anime)}
      />

      <div className="size-full">
        <div className="flex justify-between items-center">
          <h3
            onClick={() => onAnimeSelect(anime)}
            className="text-xl font-semibold text-gray-800 mb-2 cursor-pointer"
          >
            {anime.title}
          </h3>
          <div>
            <input
              type="checkbox"
              checked={isAnimeSelected}
              onChange={() => toggleSelectAnime(anime.mal_id)}
            />
          </div>
        </div>
        <p className="text-gray-600 text-sm hover:cursor-text">
          {anime.synopsis
            ? anime.synopsis.substring(0, 100) + '...'
            : 'Описание отсутствует'}
        </p>
      </div>
    </div>
  );
};

export default Card;
