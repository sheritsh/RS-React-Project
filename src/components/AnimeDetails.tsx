import { FC } from 'react';
import Loader from './Loader';
import ErrorFetch from './ErrorFetch';
import {
  getErrorMessage,
  useFetchAnimeDetailsQuery,
} from '../features/api/apiSlice';

interface AnimeDetailsProps {
  animeId: number;
  onClose: () => void;
}

const AnimeDetails: FC<AnimeDetailsProps> = ({ animeId, onClose }) => {
  const { data, error, isLoading } = useFetchAnimeDetailsQuery(animeId);

  if (isLoading) return <Loader />;
  if (error) {
    return <ErrorFetch errorMessage={getErrorMessage(error)} />;
  }
  if (!data) return null;

  return (
    <div className="p-4 relative light:bg-white dark:bg-[#101828] h-screen">
      <button
        role="button"
        aria-label="закрыть"
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="flex flex-col items-center gap-4">
        <img
          src={data.data.images?.webp?.image_url || ''}
          alt={data.data.title}
          className="w-64 h-auto rounded-lg shadow-lg"
        />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {data.data.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">{data.data.synopsis}</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold">Рейтинг:</span>{' '}
            {data.data.score || 'Нет данных'}
          </div>
          <div>
            <span className="font-semibold">Эпизоды:</span>{' '}
            {data.data.episodes || 'Нет данных'}
          </div>
          <div>
            <span className="font-semibold">Статус:</span>{' '}
            {data.data.status || 'Нет данных'}
          </div>
          <div>
            <span className="font-semibold">Год:</span>{' '}
            {data.data.year || 'Нет данных'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;
