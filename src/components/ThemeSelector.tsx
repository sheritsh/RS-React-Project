import { FC } from 'react';
import { useTheme } from '../context/useTheme';
import { SunIcon, MoonIcon } from '@heroicons/react/solid';

const ThemeSelector: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-selector">
      <button
        onClick={toggleTheme}
        className="p-2 bg-gray-200 rounded-[50%] flex items-center cursor-pointer"
      >
        {theme === 'dark' ? (
          <MoonIcon className="h-6 w-6 text-gray-800" />
        ) : (
          <SunIcon className="h-6 w-6 text-yellow-500" />
        )}
      </button>
    </div>
  );
};

export default ThemeSelector;
