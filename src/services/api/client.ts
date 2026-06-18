/**
 * HTTP Client for API calls
 * Handles base configuration and common errors
 */

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');

/**
 * Build a complete API URL
 */
export function buildApiUrl(path: string): string {
  return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Base configuration for HTTP requests
 */
const DEFAULT_FETCH_OPTIONS: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Execute a GET HTTP request
 */
export async function httpGet<T>(path: string): Promise<T> {
  const url = buildApiUrl(path);
  const response = await fetch(url, {
    ...DEFAULT_FETCH_OPTIONS,
    method: 'GET',
  });

  if (!response.ok) {
    throw new ApiError(`HTTP ${response.status}`, response.status);
  }

  return response.json() as Promise<T>;
}

/**
 * Class to handle API errors
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
