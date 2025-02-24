import { FC } from 'react';
import { Link } from 'react-router-dom';
import logo from '/logo.png';
import Search from './Search';
import ThemeSelector from './ThemeSelector';

interface HeaderProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  reset: () => void;
}

const Header: FC<HeaderProps> = ({ searchTerm, onSearch, reset }) => {
  return (
    <header className="bg-gray-800 text-gray shadow-md py-4 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <Link
            to="/"
            className="hover:opacity-80 transition-opacity duration-200"
          >
            <img
              src={logo}
              alt="Логотип"
              className="h-12 w-auto object-contain"
              onClick={() => reset()}
            />
          </Link>
        </div>
        <div className="md:w-auto flex-grow max-w-2xl">
          <Search searchTerm={searchTerm} onSearch={onSearch} />
        </div>
        <div className="flex-shrink-0">
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
};

export default Header;
