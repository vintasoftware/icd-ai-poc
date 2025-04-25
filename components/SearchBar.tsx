'use client';

import { useState } from 'react';
import { TextInput, Button, Paper, Stack, Alert, Text } from '@mantine/core';
import { IconSearch, IconAlertCircle } from '@tabler/icons-react';
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
    <Paper shadow="sm" p="md" radius="md">
      <Stack gap="md">
        <TextInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search ICD-10 codes"
          leftSection={<IconSearch size={16} style={{ color: 'var(--mantine-color-gray-5)' }} />}
          rightSectionWidth={85}
          rightSection={
            <Button
              onClick={handleSearch}
              loading={isLoading}
              size="sm"
              variant="light"
            >
              Search
            </Button>
          }
        />

        {error && (
          <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light" p="xs">
            {error}
          </Alert>
        )}

        {results.length > 0 && (
          <Paper pt="xs">
            {results.map((result) => (
              <Paper 
                key={result.code}
                p="xs"
                style={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'var(--mantine-color-gray-0)'
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <Text fw={600} size="sm" style={{ minWidth: '80px' }}>{result.code}</Text>
                  <Text size="sm">{result.description}</Text>
                </div>
              </Paper>
            ))}
          </Paper>
        )}
      </Stack>
    </Paper>
  );
} 