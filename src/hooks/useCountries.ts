import { useState, useCallback, useMemo } from 'react';
import { Country, SortConfig } from '../types/country';
import { fetchCountries } from '../services/countryService';

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'name',
    order: 'asc',
  });
  const [visitedCountries, setVisitedCountries] = useState<Set<string>>(() => {
    const stored = localStorage.getItem('visitedCountries');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  const loadCountries = useCallback(async () => {
    const data = await fetchCountries();
    setCountries(data);
  }, []);

  const toggleVisitedCountry = useCallback((countryCode: string) => {
    setVisitedCountries((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(countryCode)) {
        newSet.delete(countryCode);
      } else {
        newSet.add(countryCode);
      }
      localStorage.setItem('visitedCountries', JSON.stringify([...newSet]));
      return newSet;
    });
  }, []);

  const filteredAndSortedCountries = useMemo(() => {
    let result = [...countries];

    if (searchQuery) {
      result = result.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedRegion) {
      result = result.filter((country) => country.region === selectedRegion);
    }

    result.sort((a, b) => {
      const multiplier = sortConfig.order === 'asc' ? 1 : -1;
      if (sortConfig.field === 'name') {
        return multiplier * a.name.common.localeCompare(b.name.common);
      }
      return multiplier * (a.population - b.population);
    });

    return result;
  }, [countries, searchQuery, selectedRegion, sortConfig]);

  const regions = useMemo(() => {
    return Array.from(
      new Set(countries.map((country) => country.region))
    ).sort();
  }, [countries]);

  return {
    countries: filteredAndSortedCountries,
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
  };
};
