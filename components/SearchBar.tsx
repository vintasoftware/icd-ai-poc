'use client';

import { useState } from 'react';
import { TextInput, Button, Paper, Group } from '@mantine/core';

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
      <Group style={{ flexWrap: 'nowrap' }}>
        <TextInput
          placeholder="Search ICD-10 codes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          style={{ width: '100%' }}
        />
        <Button
          size="sm"
          variant="light"
          onClick={handleSearch}
          loading={loading}
          style={{ flexShrink: 0 }}
        >
          Search
        </Button>
      </Group>
    </Paper>
  );  
} 