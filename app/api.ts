const API_BASE_URL = 'https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search';

// The API returns data in this format: [totalCount, codes[], extras, displayStrings[][]]
type APIResponse = [number, string[], null, [string, string][]];

export async function search(query: string): Promise<{ code: string; description: string }[]> {
  if (!query.trim()) {
    return [];
  }

  // Following the exact format from the documentation
  // Example: https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&terms=tuberc
  const url = `${API_BASE_URL}?sf=code,name&terms=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ICD-10 codes: ${response.statusText}`);
    }

    const [_total, _codes, _extras, displayStrings] = await response.json() as APIResponse;

    // Transform the API response into our expected format
    // displayStrings is an array of [code, description] pairs
    return displayStrings?.map(([code, description]) => ({
      code,
      description
    })) || [];
  } catch (error) {
    console.error('Error fetching ICD-10 codes:', error);
    throw error;
  }
} 