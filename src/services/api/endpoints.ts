/**
 * API endpoint definitions
 * Centralizes all API routes for easy maintenance
 */

import type { Lang } from '../../types';

/**
 * Endpoint for home content
 */
export function getHomeEndpoint(lang: Lang): string {
  return `/content/home?lang=${lang}`;
}

/**
 * Endpoint for contacts
 */
export function getContactEndpoint(lang: Lang): string {
  return `/contact?lang=${lang}`;
}
