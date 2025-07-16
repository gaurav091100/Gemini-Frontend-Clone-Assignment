/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { useCountries } from '@/hooks/useCountries';

interface CountrySelectProps {
  value: string;
  onChange: (countryCode: string, dialCode: string) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { countries, loading, error } = useCountries();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = countries.filter((country: any) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.dialCode.includes(searchQuery)
  );

  const selectedCountry = countries.find((country: any) => country.cca2 === value);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="w-full justify-between bg-background"
          disabled={loading}
        >
          {selectedCountry ? (
            <span className="flex items-center gap-2">
              <span className="text-lg">{selectedCountry.flag}</span>
              <span>{(selectedCountry as any).dialCode}</span>
            </span>
          ) : (
            <span className="text-muted-foreground">
              {loading ? 'Loading...' : error ? 'Failed to load' : 'Select country'}
            </span>
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              disabled={loading}
            />
          </div>
        </div>
        <div className="max-h-60 overflow-auto">
          {filteredCountries.map((country: any) => (
            <button
              key={country.cca2}
              onClick={() => {
                onChange(country.cca2, country.dialCode);
                setIsOpen(false);
                setSearchQuery('');
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-accent transition-colors"
            >
              <span className="text-lg">{country.flag}</span>
              <span className="font-medium">{country.name.common}</span>
              <span className="ml-auto text-muted-foreground">{country.dialCode}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CountrySelect;