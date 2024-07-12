import React, { useState, useEffect } from 'react';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

const mapboxClient = mbxGeocoding({ accessToken: import.meta.env.VITE_MAPBOX_TOKEN });

interface Suggestion {
  place_name: string;
  coordinates: [number, number];
  area: string;
  city: string;
  state: string;
  pincode: string;
}

interface LocationSearchProps {
  defaultArea?: string;
  onSelectSuggestion: (suggestion: Suggestion) => void;
}



const LocationSuggestion: React.FC<LocationSearchProps> = ({ defaultArea = '', onSelectSuggestion }) => {
  const [query, setQuery] = useState(defaultArea);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    setQuery(defaultArea);
  }, [defaultArea]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {  // Trigger search when input length is more than 2
      try {
        const response = await mapboxClient.forwardGeocode({
          query: value,
          limit: 5,
        }).send();

        if (response && response.body && response.body.features) {
          const suggestionList = response.body.features.map((feature: any) => {
            const context = feature.context || [];
            const area = context.find((item: any) => item.id.includes('place') || item.id.includes('locality'))?.text || 'N/A';
            const city = context.find((item: any) => item.id.includes('place'))?.text || 'N/A';
            const state = context.find((item: any) => item.id.includes('region'))?.text || 'N/A';
            const pincode = context.find((item: any) => item.id.includes('postcode'))?.text || '';

            return {
              place_name: feature.place_name,
              coordinates: feature.center,
              area,
              city,
              state,
              pincode,
            };
          }).filter((suggestion: Suggestion) => suggestion.pincode !== ''); // Filter out suggestions without pincode

          setSuggestions(suggestionList);
        }
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setQuery(suggestion.place_name);
    setSuggestions([]);
    onSelectSuggestion(suggestion);  // Send the selected suggestion to the parent
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div>{suggestion.place_name}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSuggestion;