import { useEffect, useState } from 'react';
import { fetchContact, fetchHomeContent } from '../services';
import { inlineVerseReferences } from '../utils';
import type { ContactResponse, Lang } from '../types';

/**
 * Site content state
 */
type SiteContentState = {
  brand: string;
  heading: string;
  homeHtml: string;
  contact: ContactResponse | null;
  loading: boolean;
  waitingForApi: boolean;
  error: string;
};

/**
 * Default initial state
 */
const initialState: SiteContentState = {
  brand: 'A New Life',
  heading: 'Una Vita Nuova',
  homeHtml: '',
  contact: null,
  loading: true,
  waitingForApi: false,
  error: '',
};

/**
 * Hook to manage site content loading
 * Fetches home content and contacts for the specified language
 *
 * @param lang - Language for the content
 * @returns Current content state
 */
export function useSiteContent(lang: Lang): SiteContentState {
  const [state, setState] = useState<SiteContentState>(initialState);

  useEffect(() => {
    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    const load = async () => {
      try {
        setState((current) => ({ ...current, loading: true, error: '' }));

        // Load home content and contacts in parallel
        const [homeData, contactData] = await Promise.all([
          fetchHomeContent(lang),
          fetchContact(lang),
        ]);

        if (cancelled) {
          return;
        }

        setState({
          brand: homeData.brand,
          heading: homeData.heading,
          homeHtml: inlineVerseReferences(homeData.content),
          contact: contactData,
          loading: false,
          waitingForApi: false,
          error: '',
        });
      } catch (err) {
        if (cancelled) {
          return;
        }

        // Handle API errors with automatic retry
        const isApiUnavailable = (err as Error).message.includes('HTTP');
        if (isApiUnavailable) {
          setState((current) => ({ ...current, waitingForApi: true, error: '' }));
          retryTimer = setTimeout(load, 2500);
          return;
        }

        setState((current) => ({
          ...current,
          loading: false,
          waitingForApi: false,
          error: (err as Error).message,
        }));
      }
    };

    load();

    // Cleanup: cancel loading if component unmounts
    return () => {
      cancelled = true;
      if (retryTimer) {
        clearTimeout(retryTimer);
      }
    };
  }, [lang]);

  return state;
}