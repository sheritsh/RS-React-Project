import React, { useEffect } from 'react';
import { CountryCard } from './CountryCard';
import { useCountries } from '../hooks/useCountries';
import { SortField } from '../types/country';

export const CountryList: React.FC = () => {
  const {
    countries,
    searchQuery,
    setSearchQuery,
    selectedRegion,
    setSelectedRegion,
    sortConfig,
    setSortConfig,
    visitedCountries,
    toggleVisitedCountry,
    regions,
    loadCountries,
  } = useCountries();

  useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  const handleSortChange = (field: SortField) => {
    setSortConfig((prev) => ({
      field,
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <div className="country-list-container">
      <div className="controls">
        <input
          type="text"
          placeholder="Search countries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="region-select"
        >
          <option value="">All Regions</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
        <div className="sort-controls">
          <button
            onClick={() => handleSortChange('name')}
            className={`sort-button ${sortConfig.field === 'name' ? 'active' : ''}`}
          >
            Sort by Name{' '}
            {sortConfig.field === 'name' &&
              (sortConfig.order === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSortChange('population')}
            className={`sort-button ${sortConfig.field === 'population' ? 'active' : ''}`}
          >
            Sort by Population{' '}
            {sortConfig.field === 'population' &&
              (sortConfig.order === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      <div className="country-grid">
        {countries.map((country) => (
          <CountryCard
            key={country.cca3}
            country={country}
            isVisited={visitedCountries.has(country.cca3)}
            onToggleVisited={toggleVisitedCountry}
          />
        ))}
      </div>
    </div>
  );
};
