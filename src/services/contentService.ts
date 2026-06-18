/**
 * Service for managing site content
 * Responsible for content-related operations (home, etc.)
 */

import { httpGet } from './api/client';
import { getHomeEndpoint } from './api/endpoints';
import type { HomeResponse, Lang } from '../types';

/**
 * Fetch home page content
 */
export async function fetchHomeContent(lang: Lang): Promise<HomeResponse> {
  return httpGet<HomeResponse>(getHomeEndpoint(lang));
}
