import { useEffect, useState } from 'react';
import { apiUrl } from '../lib/api';
import type { ContactResponse, HomeResponse, Lang } from '../types/content';

type SiteContentState = {
  brand: string;
  heading: string;
  homeHtml: string;
  contact: ContactResponse | null;
  loading: boolean;
  waitingForApi: boolean;
  error: string;
};

const initialState: SiteContentState = {
  brand: 'A New Life',
  heading: 'Una Vita Nuova',
  homeHtml: '',
  contact: null,
  loading: true,
  waitingForApi: false,
  error: '',
};

function inlineVerseReferences(html: string): string {
  const pattern = /<p class="ver">([\s\S]*?)<\/p>\s*<p class="ver-rif">([\s\S]*?)<\/p>/g;
  return html.replace(pattern, '<p class="ver">$1<span class="ver-ref">$2</span></p>');
}

export function useSiteContent(lang: Lang): SiteContentState {
  const [state, setState] = useState<SiteContentState>(initialState);

  useEffect(() => {
    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    const load = async () => {
      try {
        setState((current) => ({ ...current, loading: true, error: '' }));

        const [homeRes, contactRes] = await Promise.all([
          fetch(apiUrl(`/content/home?lang=${lang}`)),
          fetch(apiUrl(`/contact?lang=${lang}`)),
        ]);

        if (!homeRes.ok || !contactRes.ok) {
          throw new Error('API_UNAVAILABLE');
        }

        const homeData = (await homeRes.json()) as HomeResponse;
        const contactData = (await contactRes.json()) as ContactResponse;

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

        if ((err as Error).message === 'API_UNAVAILABLE') {
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

    return () => {
      cancelled = true;
      if (retryTimer) {
        clearTimeout(retryTimer);
      }
    };
  }, [lang]);

  return state;
}