export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

// Helper function to construct API URLs
export const getApiUrl = (path: string): string => {
  return `${API_BASE_URL}${path}`;
};
