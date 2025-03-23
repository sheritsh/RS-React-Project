import { Country } from '../types/country';

const API_BASE_URL = 'https://restcountries.com/v3.1';

export const fetchCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/all`);
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};
