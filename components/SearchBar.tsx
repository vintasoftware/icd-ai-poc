'use client';

import { useState } from 'react';
import { TextInput, Button, Paper, Stack } from '@mantine/core';

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

export function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <Paper withBorder p="md">
      <Stack gap="xs">
        <TextInput
          placeholder="Search ICD-10 codes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          rightSectionWidth={85}
          rightSection={
            <Button
              size="sm"
              variant="light"
              onClick={handleSearch}
              loading={loading}
              mr="xs"
            >
              Search
            </Button>
          }
          rightSectionPointerEvents="auto"
        />
      </Stack>
    </Paper>
  );
} 