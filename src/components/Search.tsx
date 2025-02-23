import { FC, useState, FormEvent, useEffect } from 'react';

interface SearchProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

const Search: FC<SearchProps> = ({ searchTerm, onSearch }) => {
  const [input, setInput] = useState(searchTerm);

  useEffect(() => {
    setInput(searchTerm);
  }, [searchTerm]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Поиск..."
        className="bg-gray-700 text-white rounded-lg px-4 py-2
                 focus:outline-none focus:ring-2 focus:ring-blue-400
                 transition-all duration-200 flex-grow
                 placeholder-gray-400 max-w-[180px] sm:max-w-[100%]"
      />
      <button
        type="submit"
        className="hover:cursor-pointer bg-blue-500 hover:bg-blue-600 text-white
                 font-semibold py-2 px-6 rounded-lg
                 transition-colors duration-200 transform hover:scale-105
                 whitespace-nowrap"
      >
        Поиск
      </button>
    </form>
  );
};

export default Search;
