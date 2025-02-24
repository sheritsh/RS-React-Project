import { FC, useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Anime } from '../types';
import Header from '../components/Header';
import SearchResults from '../components/SearchResults';
import AnimeDetails from '../components/AnimeDetails';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import ErrorFetch from '../components/ErrorFetch';
import { getErrorMessage, useFetchAnimeQuery } from '../features/api/apiSlice';
import Flyout from '../components/Flyout';

const MainPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useLocalStorage<string>('searchTerm', '');
  const [queryTerm, setQueryTerm] = useState<string>('');
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const currentPage = Number(searchParams.get('page')) || 1;
  const selectedId = searchParams.get('details');

  const { data, error, isLoading } = useFetchAnimeQuery({
    searchTerm: queryTerm,
    page: currentPage,
  });

  const totalPages = data
    ? Math.ceil(data.pagination.items.total / data.pagination.items.per_page)
    : 1;
  const animeList = useMemo(() => {
    return data ? data.data : [];
  }, [data]);

  useEffect(() => {
    if (selectedId) {
      const anime = animeList.find((a) => a.mal_id === Number(selectedId));
      if (anime) {
        setSelectedAnime(anime);
      }
    }
  }, [selectedId, animeList]);

  const handlePageChange = (page: number) => {
    setSearchParams({
      page: page.toString(),
      ...(selectedId && { details: selectedId }),
    });
  };

  const handleAnimeSelect = (anime: Anime) => {
    setSelectedAnime(anime);
    setSearchParams({
      page: currentPage.toString(),
      details: String(anime.mal_id),
    });
  };

  const handleCloseDetails = () => {
    setSelectedAnime(null);
    setSearchParams({ page: currentPage.toString() });
  };

  const handleSearch = (term: string) => {
    const trimmedTerm = term.trim();
    setSearchTerm(trimmedTerm);
    setQueryTerm(trimmedTerm);
    setSearchParams({ page: '1' });
  };

  const handleResetSearch = () => {
    setQueryTerm(''); // Сбрасываем запрос
    setSearchParams({ page: '1' });
  };

  return (
    <>
      <Header
        searchTerm={searchTerm}
        onSearch={handleSearch}
        reset={handleResetSearch}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <ErrorFetch errorMessage={getErrorMessage(error)} />
        ) : (
          <div className="flex flex-grow relative">
            <div
              className={`flex-1 transition-all duration-300 ${
                selectedAnime ? '2xl:w-1/2 2xl:pr-4' : 'w-full'
              }`}
            >
              <SearchResults
                animeList={animeList}
                onAnimeSelect={handleAnimeSelect}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
            {selectedAnime && (
              <div className="fixed 2xl:static inset-0 2xl:w-1/2 bg-white 2xl:bg-transparent z-10 overflow-auto">
                <div className="h-full 2xl:border-l 2xl:border-gray-200">
                  <AnimeDetails
                    animeId={Number(selectedAnime.mal_id)}
                    onClose={handleCloseDetails}
                  />
                </div>
              </div>
            )}
            {!selectedAnime && <Flyout />}
          </div>
        )}
      </main>
    </>
  );
};

export default MainPage;
