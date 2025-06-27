'use client';

import { useState } from 'react';
import { Container, Title, Stack, Tabs, Paper, Text, Alert } from '@mantine/core';
import { SearchBar } from '../components/SearchBar';
import { AIPoweredSearch, search } from './api';

interface SearchResult {
  code: string;
  description: string;
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string | null>('all');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);
    setHasSearched(true);

    try {
      let searchResults;
      if (activeTab === 'problems' || activeTab === 'allergies') {
        const response = await AIPoweredSearch(query, activeTab);
        searchResults = response.results;
      } else {
        searchResults = await search(query);
      }
      setResults(searchResults || []);
    } catch (err) {
      setError('Failed to fetch or classify ICD-10 codes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (newTab: string | null) => {
    setActiveTab(newTab);
    setResults([]);
    setError(null);
    setHasSearched(false);
  };

  return (
    <Container size="sm" py="xl">
      <Stack gap="lg">
        <Title order={1}>ICD-10 Code Search</Title>
        
        <SearchBar onSearch={handleSearch} loading={loading} />

        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tabs.List>
            <Tabs.Tab value="all">All Codes</Tabs.Tab>
            <Tabs.Tab value="problems">Problems</Tabs.Tab>
            <Tabs.Tab value="allergies">Allergies</Tabs.Tab>
          </Tabs.List>
        </Tabs>

        {error && (
          <Alert color="red" title="Error" mt="md">
            {error}
          </Alert>
        )}

        {!loading && !hasSearched && !error && (
          <Text ta="center" mt="md">
            Your results will appear here.
          </Text>
        )}

        {!loading && hasSearched && results.length === 0 && !error && (
          <Text ta="center" mt="md">
            No results found.
          </Text>
        )}

        {results.length > 0 && (
          <Stack gap="xs" mt="md">
            {results.map((result, index) => (
              <Paper key={index} p="xs" withBorder>
                <Text fw={500}>{result.code}</Text>
                <Text size="sm" c="dimmed">{result.description}</Text>
              </Paper>
            ))}
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
