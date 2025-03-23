import React from 'react';
import { Country } from '../types/country';

interface CountryCardProps {
  country: Country;
  isVisited: boolean;
  onToggleVisited: (countryCode: string) => void;
}

export const CountryCard: React.FC<CountryCardProps> = React.memo(
  ({ country, isVisited, onToggleVisited }: CountryCardProps) => {
    return (
      <div className={`country-card ${isVisited ? 'visited' : ''}`}>
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          className="country-flag"
        />
        <div className="country-info">
          <h3>{country.name.common}</h3>
          <p>Population: {country.population.toLocaleString()}</p>
          <p>Region: {country.region}</p>
        </div>
        <button
          onClick={() => onToggleVisited(country.cca3)}
          className="visit-button"
        >
          {isVisited ? 'Mark as Unvisited' : 'Mark as Visited'}
        </button>
      </div>
    );
  }
);

CountryCard.displayName = 'CountryCard';
