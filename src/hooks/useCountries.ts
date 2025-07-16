import { useEffect, useState } from 'react';
import type { Country } from '@/lib/types';

const COUNTRIES_KEY = 'cached_countries_v1';

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = localStorage.getItem(COUNTRIES_KEY);
    if (cached) {
      setCountries(JSON.parse(cached));
      setLoading(false);
      return;
    }
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag');
        const data = await response.json();
        const processed = data
          .filter((country: Country) => country.idd?.root)
          .map((country: Country) => ({
            ...country,
            dialCode: country.idd.root + (country.idd.suffixes?.[0] || ''),
          }))
          .sort((a: any, b: any) => a.name.common.localeCompare(b.name.common));
        setCountries(processed);
        localStorage.setItem(COUNTRIES_KEY, JSON.stringify(processed));
      } catch (err) {
        setError('Failed to fetch countries');
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  return { countries, loading, error };
} 