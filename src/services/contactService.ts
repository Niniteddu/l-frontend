/**
 * Service for managing contacts
 * Responsible for contact-related operations and information
 */

import { httpGet } from './api/client';
import { getContactEndpoint } from './api/endpoints';
import type { ContactResponse, Lang } from '../types';

/**
 * Fetch contact data
 */
export async function fetchContact(lang: Lang): Promise<ContactResponse> {
  return httpGet<ContactResponse>(getContactEndpoint(lang));
}
