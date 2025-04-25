'use client';

import { useState } from 'react';
import { search } from '../app/api';

interface SearchResult {
  code: string;
  description: string;
}

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const searchResults = await search(query);
      setResults(searchResults);
    } catch (err) {
      setError('Failed to fetch ICD-10 codes. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for ICD-10 codes or descriptions"
          className="flex-1 p-2 border rounded"
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={handleSearch}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && (
        <div className="text-red-500 p-2 border border-red-200 rounded bg-red-50">
          {error}
        </div>
      )}

      <div className="search-results">
        {results.length === 0 ? (
          <p className="text-gray-500">No results found</p>
        ) : (
          <ul className="space-y-2">
            {results.map((result) => (
              <li key={result.code} className="p-2 border rounded hover:bg-gray-50">
                <h3 className="font-bold">{result.code}</h3>
                <p className="text-gray-700">{result.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 