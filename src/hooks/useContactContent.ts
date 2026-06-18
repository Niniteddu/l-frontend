import { useEffect, useState } from 'react';
import { fetchContact } from '../services';
import type { ContactResponse, Lang } from '../types';

/**
 * Contact content state
 */
type ContactContentState = {
  contact: ContactResponse | null;
  loading: boolean;
  waitingForApi: boolean;
  error: string;
};

/**
 * Default initial state
 */
const initialState: ContactContentState = {
  contact: null,
  loading: true,
  waitingForApi: false,
  error: '',
};

/**
 * Hook to manage contact content loading
 * Fetches contacts only when needed (on contact page)
 *
 * @param lang - Language for the content
 * @returns Current contact state
 */
export function useContactContent(lang: Lang): ContactContentState {
  const [state, setState] = useState<ContactContentState>(initialState);

  useEffect(() => {
    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    const load = async () => {
      try {
        setState((current) => ({ ...current, loading: true, error: '' }));

        const contactData = await fetchContact(lang);

        if (cancelled) {
          return;
        }

        setState({
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
