export const getApiBaseUrl = (): string => {
  if (import.meta.env.DEV && !import.meta.env.VITE_API_URL) {
    return '';
  }

  return import.meta.env.VITE_API_URL || 'http://localhost:8080';
};

export const buildApiUrl = (path: string): string => `${getApiBaseUrl()}${path}`;
