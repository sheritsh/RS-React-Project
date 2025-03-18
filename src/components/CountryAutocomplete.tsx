import { FC, useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface CountryAutocompleteProps {
  value: string;
  onChange: (country: string) => void;
  id: string;
  error?: string;
}

const CountryAutocomplete: FC<CountryAutocompleteProps> = ({
  value,
  onChange,
  id,
  error,
}) => {
  const countries = useSelector((state: RootState) => state.countries);
  const [inputValue, setInputValue] = useState(value || '');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      onChange('');
    } else {
      // Explicit type safety for the countries array
      const filteredSuggestions = (countries as string[])
        .filter((country: string) =>
          country.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5);

      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    }
  };

  const handleSelectCountry = (country: string) => {
    setInputValue(country);
    onChange(country);
    setShowSuggestions(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <input
        type="text"
        id={id}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() =>
          inputValue && suggestions.length && setShowSuggestions(true)
        }
        className={`w-full p-2 border ${error ? 'border-red-500' : 'border-gray-300'} 
          rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
        placeholder="Start typing a country name..."
      />

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
          {suggestions.map((country, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectCountry(country)}
            >
              {country}
            </li>
          ))}
        </ul>
      )}

      {showSuggestions && suggestions.length === 0 && inputValue && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg p-2 text-gray-500">
          No matching countries found
        </div>
      )}
    </div>
  );
};

export { CountryAutocomplete };
