import { Container, Title, Stack } from '@mantine/core';
import { SearchBar } from '../components/SearchBar';

export default function HomePage() {
  return (
    <Container size="sm" py="xl">
      <Stack gap="lg">
        <Title order={1} size="h2">ICD Search</Title>
        <SearchBar />
      </Stack>
    </Container>
  );
}
